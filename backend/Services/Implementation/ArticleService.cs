using _3w1m.Data;
using _3w1m.Dtos.Article;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
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
        ArticleCollectionQueryDto? queryDto)
    {
        queryDto ??= new ArticleCollectionQueryDto();

        var course = await _dbContext.Courses.FirstOrDefaultAsync(ar => ar.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var query = _dbContext.Articles.Where(x => x.CourseId == courseId).AsQueryable();

        query = ApplyFilter(query, queryDto);
        query = ApplyOrder(query, queryDto);

        var articleCount = await query.CountAsync();
        query = ApplyPagination(query, queryDto);

        return (articleCount, _mapper.Map<IEnumerable<ArticleDto>>(await query.ToListAsync()));
    }

    public async Task<ArticleDetailDto> GetArticleByIdAsync(int articleId, int courseId)
    {
        var course = await _dbContext.Courses.FirstOrDefaultAsync(ar => ar.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var article = await _dbContext.Articles.Where(ar => ar.CourseId == courseId && ar.ArticleId == articleId)
            .FirstOrDefaultAsync();
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        return _mapper.Map<ArticleDetailDto>(article);
    }

    public async Task<ArticleDetailDto> CreateArticleAsync(int courseId, CreateRequestArticleDto article)
    {
        var course = await _dbContext.Set<Course>().FirstOrDefaultAsync(x => x.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var newArticle = _mapper.Map<Article>(article);
        newArticle.CourseId = courseId;
        newArticle.CreatedAt = DateTime.Now;
        newArticle.UpdatedAt = DateTime.Now;

        _dbContext.Add((object)newArticle);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<ArticleDetailDto>(newArticle);
    }

    public async Task<ArticleDetailDto> UpdateArticleAsync(int courseId, int articleId,
        UpdateRequestArticleDto updateDto)
    {
        var course = await _dbContext.Set<Course>().FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var article = await _dbContext.Set<Article>()
            .FirstOrDefaultAsync(a => a.CourseId == courseId && a.ArticleId == articleId);
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        if (updateDto.Title != null)
        {
            article.Title = updateDto.Title;
        }

        if (updateDto.Content != null)
        {
            article.Content = updateDto.Content;
        }

        if (updateDto.Summary != null)
        {
            article.Summary = updateDto.Summary;
        }

        article.UpdatedAt = DateTime.Now;
            
        return _mapper.Map<ArticleDetailDto>(article);
    }

    public async Task<DeleteResponseArticleDto> DeleteArticleAsync(int courseId, int articleId)
    {
        var course = await _dbContext.Set<Course>().FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var article = await _dbContext.Set<Article>()
            .FirstOrDefaultAsync(a => a.CourseId == courseId && a.ArticleId == articleId);
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        _dbContext.Remove(article);
        var response = new DeleteResponseArticleDto
        {
            Success = await _dbContext.SaveChangesAsync() > 0
        };

        return response;
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

        if (queryDto.CreatedAt != default)
        {
            query = query.Where(x => x.CreatedAt == queryDto.CreatedAt);
        }

        if (queryDto.UpdatedAt != default)
        {
            query = query.Where(x => x.UpdatedAt == queryDto.UpdatedAt);
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