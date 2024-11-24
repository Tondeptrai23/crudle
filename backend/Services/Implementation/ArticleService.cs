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

    public async Task<ArticleDetailDto> GetArticleByIdAsync(int articleId, int courseId, int studentId)
    {
        var student = await _dbContext.Students.FirstOrDefaultAsync(ar => ar.StudentId == studentId);
        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }

        var course = await _dbContext.Courses.FirstOrDefaultAsync(ar => ar.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (await _dbContext.Enrollments.AnyAsync(er => er.CourseId == courseId && er.StudentId == studentId) == false)
        {
            throw new ForbiddenException("Student not enrolled in this course");
        }

        var article = await _dbContext.Articles.Where(ar => ar.CourseId == courseId && ar.ArticleId == articleId)
            .FirstOrDefaultAsync();
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        return _mapper.Map<ArticleDetailDto>(article);
    }

    public async Task<ArticleDetailDto> CreateArticleAsync(int courseId, int teacherId, CreateArticleRequestDto article)
    {
        var teacher = await _dbContext.Teachers.FirstOrDefaultAsync(t => t.TeacherId == teacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }
        var course = await _dbContext.Set<Course>().FirstOrDefaultAsync(x => x.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }
        if (course.TeacherId == teacherId)
        {
            throw new ForbiddenException("Teacher not authorized to create article for this course");
        }

        var newArticle = _mapper.Map<Article>(article);
        newArticle.CourseId = courseId;
        newArticle.CreatedAt = DateTime.Now;
        newArticle.UpdatedAt = DateTime.Now;
        newArticle.Order = await _dbContext.Articles.Where(a => a.CourseId == courseId).CountAsync() + 1;

        _dbContext.Add(newArticle);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<ArticleDetailDto>(newArticle);
    }

    public async Task<ArticleDetailDto> UpdateArticleAsync(int courseId, int articleId, int teacherId,
        UpdateArticleRequestDto updateArticleDto)
    {
        var teacher = await _dbContext.Teachers.FirstOrDefaultAsync(t => t.TeacherId == teacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }

        var course = await _dbContext.Courses.Include(course => course.Teacher).FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (course.TeacherId == teacherId)
        {
            throw new ForbiddenException("Teacher not authorized to update article of this course");
        }

        var article = await _dbContext.Set<Article>()
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

        return _mapper.Map<ArticleDetailDto>(article);
    }


    public async Task<UpdateArticleProgressDto> MarkArticleAsReadAsync(int courseId, int articleId, int studentId)
    {
        var course = await _dbContext.Courses.Include(c => c.Enrollments).FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var student = await _dbContext.Students.FirstOrDefaultAsync(s => s.StudentId == studentId);
        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }

        var article = await _dbContext.Articles.FirstOrDefaultAsync(a => a.ArticleId == articleId && a.CourseId == courseId);
        if (article == null)
        {
            throw new ResourceNotFoundException("Article not found");
        }

        if (course.Enrollments.Any(e => e.StudentId == studentId) == false)
        {
            throw new ForbiddenException("Student not enrolled in this course");
        }

        var articleProgress = await _dbContext.ArticleProgresses.FirstOrDefaultAsync(ap =>
            ap.ArticleId == articleId && ap.StudentId == studentId);

        if (articleProgress != null)
        {
            _dbContext.ArticleProgresses.Remove(articleProgress);
        }

        if (articleProgress == null)
        {
            articleProgress = new ArticleProgress
            {
                ArticleId = articleId,
                StudentId = studentId,
                IsDone = true
            };
            _dbContext.ArticleProgresses.Add(articleProgress);
        }

        await _dbContext.SaveChangesAsync();

        return _mapper.Map<UpdateArticleProgressDto>(articleProgress);
    }

    public async Task<DeleteArticleResponseDto> DeleteArticleAsync(int courseId, int articleId, int teacherId)
    {
        var teacher = await _dbContext.Teachers.FirstOrDefaultAsync(t => t.TeacherId == teacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }
        var course = await _dbContext.Set<Course>().Include(course => course.Teacher).FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (course.TeacherId != teacherId)
        {
            throw new ForbiddenException("Teacher not authorized to delete this course");
        }

        var article = await _dbContext.Set<Article>()
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
        
        var response = new DeleteArticleResponseDto
        {
            Success = await _dbContext.SaveChangesAsync() > 0
        };

        return response;
    }

    public async Task<IEnumerable<ArticleDto>> UpdateArticleOrderAsync(int courseId, int[] articleIds, int teacherId)
    {
        var teacher = await _dbContext.Teachers.FirstOrDefaultAsync(t => t.TeacherId == teacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }

        var course = await _dbContext.Courses.Include(course => course.Teacher).FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (course.TeacherId != teacherId)
        {
            throw new ForbiddenException("Teacher not authorized to update article order of this course");
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