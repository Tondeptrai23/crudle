using _3w1m.Dtos.Article;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;

namespace _3w1m.Services.Interface;

public interface IArticleService
{
    /// <summary>
    /// Get articles by courseId
    /// </summary>
    /// <param name="courseId">The unique identifier of the course </param>
    /// <param name="queryDto">The query parameters for filtering, ordering, and pagination</param>
    /// <returns>The task result contains the quantity and a collection of article Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<(int, IEnumerable<ArticleDto>)> GetArticlesAsync(int courseId, ArticleCollectionQueryDto? queryDto);

    /// <summary>
    /// Get article by articleId and courseId
    /// </summary>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="studentId">The unique identifier of the student</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ArticleDetailDto> GetArticleByIdAsync(int articleId, int courseId, int studentId);

    /// <summary>
    /// Create an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <param name="createArticleDto">The Dto containing the information for create new article</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or article is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the teacher is not the one teaching the course</exception>
    Task<ArticleDetailDto> CreateArticleAsync(int courseId, int teacherId,CreateArticleRequestDto createArticleDto);

    /// <summary>
    /// Update an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <param name="updateArticleDto">The Dto containing the information for update article</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the article is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the teacher is not the owner of the article</exception>
    Task<ArticleDetailDto> UpdateArticleAsync(int courseId, int articleId, int teacherId, UpdateArticleRequestDto updateArticleDto);

    /// <summary>
    /// Update an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <returns>The task result contains the response when article deleted</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or article is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the teacher is not the owner of the article</exception>
    Task<DeleteArticleResponseDto> DeleteArticleAsync(int courseId, int articleId, int teacherId);
}