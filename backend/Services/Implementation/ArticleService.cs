using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _3w1m.Data;
using _3w1m.Dtos.Article;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class ArticleService : IArticleService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper _mapper;

    public ArticleService(ApplicationDbContext dbContext, IMapper mapper)
    {
        _mapper = mapper;
        _dbContext = dbContext;
    }

    public async Task<(int, IEnumerable<ArticleDto>)> GetArticlesAsync(int courseId,
        IArticleSpecification serviceSpecification,
        ArticleCollectionQueryDto? queryDto)
    {
        queryDto ??= new ArticleCollectionQueryDto();

        var course = await _dbContext.Courses.FirstOrDefaultAsync(ar => ar.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        IQueryable<Article> query = _dbContext.Articles
            .Where(x => x.CourseId == courseId)
            .AsQueryable();

        query = serviceSpecification.Apply(query);
        query = ApplyFilter(query, queryDto);
        query = ApplyOrder(query, queryDto);

        var articleCount = await query.CountAsync();
        query = ApplyPagination(query, queryDto);

        var articleDtos = _mapper.Map<IEnumerable<ArticleDto>>(await query.ToListAsync());
        return (articleCount, articleDtos);
    }

    public async Task<ArticleDto> GetArticleByIdAsync(int courseId, int articleId, IArticleSpecification spec)
    {
        var course = await _dbContext.Courses.FirstOrDefaultAsync(ar => ar.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var article = await spec.Apply(_dbContext.Articles)
            .Where(ar => ar.CourseId == courseId && ar.ArticleId == articleId)
            .FirstOrDefaultAsync();

        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        return _mapper.Map<ArticleDto>(article);
    }

    public async Task<ArticleDto> CreateArticleAsync(int courseId, CreateArticleRequestDto article)
    {
        var course = await _dbContext.Courses.FirstOrDefaultAsync(x => x.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var newArticle = _mapper.Map<Article>(article);
        newArticle.CourseId = courseId;
        newArticle.CreatedAt = DateTime.Now;
        newArticle.UpdatedAt = DateTime.Now;
        newArticle.Order = await _dbContext.Articles.Where(a => a.CourseId == courseId).CountAsync() + 1;

        _dbContext.Add((object)newArticle);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<ArticleDto>(newArticle);
    }

    public async Task<ArticleDto> UpdateArticleAsync(int courseId, int articleId,
        UpdateArticleRequestDto updateArticleDto)
    {
        var course = await _dbContext.Courses.Include(course => course.Teacher)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var article = await _dbContext.Articles
            .FirstOrDefaultAsync(a => a.CourseId == courseId && a.ArticleId == articleId);
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        if (updateArticleDto.Title != null)
        {
            article.Title = updateArticleDto.Title;
        }

        if (updateArticleDto.Content != null)
        {
            article.Content = updateArticleDto.Content;
        }

        if (updateArticleDto.Summary != null)
        {
            article.Summary = updateArticleDto.Summary;
        }

        article.UpdatedAt = DateTime.Now;

        await _dbContext.SaveChangesAsync();

        return _mapper.Map<ArticleDto>(article);
    }


    public async Task<UpdateArticleProgressDto> MarkArticleAsReadAsync(int courseId, int articleId, int studentId)
    {
        var course = await _dbContext.Courses.Include(c => c.Enrollments)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var student = await _dbContext.Students.FirstOrDefaultAsync(s => s.StudentId == studentId);
        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }

        var article = await _dbContext.Articles
            .Include(ar => ar.ArticleProgresses.Where(ap => ap.StudentId == studentId))
            .FirstOrDefaultAsync(a => a.ArticleId == articleId && a.CourseId == courseId);
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        if (course.Enrollments.Any(e => e.StudentId == studentId) == false)
        {
            throw new ForbiddenException("Student not enrolled in this course");
        }

        var articleProgress = article.ArticleProgresses.FirstOrDefault(ap => ap.StudentId == studentId);

        if (articleProgress != null)
        {
            _dbContext.ArticleProgresses.Remove(articleProgress);
            articleProgress.ReadAt = null;
        }

        if (articleProgress == null)
        {
            articleProgress = new ArticleProgress
            {
                ArticleId = articleId,
                StudentId = studentId,
                ReadAt = DateTime.Now
            };
            _dbContext.ArticleProgresses.Add(articleProgress);
        }

        await _dbContext.SaveChangesAsync();

        return _mapper.Map<UpdateArticleProgressDto>(articleProgress);
    }

    public async Task<bool> DeleteArticleAsync(int courseId, int articleId)
    {
        var course = await _dbContext.Courses.Include(course => course.Teacher)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var article = await _dbContext.Articles
            .FirstOrDefaultAsync(a => a.CourseId == courseId && a.ArticleId == articleId);
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        _dbContext.Remove(article);

        // Update order of articles, decrease order of articles after the deleted article
        var articles = await _dbContext.Articles
            .Where(a => a.CourseId == courseId && a.Order > article.Order)
            .ToListAsync();
        foreach (var a in articles)
        {
            a.Order--;
        }

        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<ArticleDto>> UpdateArticleOrderAsync(int courseId, int[] articleIds)
    {
        var course = await _dbContext.Courses.Include(course => course.Teacher)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var articles = await _dbContext.Articles.Where(a => a.CourseId == courseId).ToListAsync();
        if (articles.Count != articleIds.Length)
        {
            throw new ConflictException("Article count does not match");
        }

        var articleDict = articles.ToDictionary(a => a.ArticleId);
        for (var i = 0; i < articleIds.Length; i++)
        {
            articleDict[articleIds[i]].Order = i + 1;
        }

        await _dbContext.SaveChangesAsync();

        return _mapper.Map<IEnumerable<ArticleDto>>(articles);
    }

    private IQueryable<Article> ApplyFilter(IQueryable<Article> query, ArticleCollectionQueryDto queryDto)
    {
        if (!string.IsNullOrEmpty(queryDto.Title))
        {
            query = query.Where(x => x.Title.Contains(queryDto.Title));
        }

        if (!string.IsNullOrEmpty(queryDto.Summary))
        {
            query = query.Where(x => x.Summary.Contains(queryDto.Summary));
        }

        if (!string.IsNullOrEmpty(queryDto.Content))
        {
            query = query.Where(x => x.Content.Contains(queryDto.Content));
        }

        if (queryDto is { CreatedAtFrom: not null, CreatedAtTo: not null })
        {
            query = query.Where(x => x.CreatedAt >= queryDto.CreatedAtFrom && x.CreatedAt <= queryDto.CreatedAtTo);
        }

        if (queryDto is { UpdatedAtFrom: not null, CreatedAtTo: not null})
        {
            query = query.Where(x => x.UpdatedAt == queryDto.UpdatedAtFrom && x.UpdatedAt == queryDto.UpdatedAtTo);
        }

        return query;
    }

    private IQueryable<Article> ApplyPagination(IQueryable<Article> query, ArticleCollectionQueryDto queryDto)
    {
        if (queryDto.Page > 0 && queryDto.Size > 0)
        {
            query = query.Skip((queryDto.Page - 1) * queryDto.Size).Take(queryDto.Size);
        }

        return query;
    }

    private IQueryable<Article> ApplyOrder(IQueryable<Article> query, ArticleCollectionQueryDto queryDto)
    {
        var orderBy = queryDto.OrderBy?.ToLower();
        var orderDirection = queryDto.OrderDirection?.ToLower();

        query = orderBy switch
        {
            "title" => orderDirection == "asc"
                ? query.OrderBy(ar => ar.Title)
                : query.OrderByDescending(ar => ar.Title),
            "summary" => orderDirection == "asc"
                ? query.OrderBy(ar => ar.Summary)
                : query.OrderByDescending(ar => ar.Summary),
            "content" => orderDirection == "asc"
                ? query.OrderBy(ar => ar.Content)
                : query.OrderByDescending(ar => ar.Content),
            "order" => orderDirection == "asc"
                ? query.OrderBy(ar => ar.Order)
                : query.OrderByDescending(ar => ar.Order),
            "createdat" => orderDirection == "asc"
                ? query.OrderBy(ar => ar.CreatedAt)
                : query.OrderByDescending(ar => ar.CreatedAt),
            "updatedat" => orderDirection == "asc"
                ? query.OrderBy(ar => ar.UpdatedAt)
                : query.OrderByDescending(ar => ar.UpdatedAt),
            _ => orderBy == "asc" ? query.OrderBy(ar => ar.ArticleId) : query.OrderByDescending(ar => ar.ArticleId)
        };
        return query;
    }
}