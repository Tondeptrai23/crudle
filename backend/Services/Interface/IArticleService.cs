using _3w1m.Dtos.Article;
using _3w1m.Models.Exceptions;
using _3w1m.Specifications.Interface;

namespace _3w1m.Services.Interface;

public interface IArticleService
{
    /// <summary>
    /// Get articles by courseId
    /// </summary>
    /// <param name="courseId">The unique identifier of the course </param>
    /// <param name="serviceSpecification">The specification for filtering articles for student and teacher</param>
    /// <param name="queryDto">The query parameters for filtering, ordering, and pagination</param>
    /// <returns>The task result contains the quantity and a collection of article Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<(int, IEnumerable<ArticleDto>)> GetArticlesAsync(int courseId, IArticleSpecification serviceSpecification,
        ArticleCollectionQueryDto? queryDto);

    /// <summary>
    /// Get article by articleId and courseId
    /// </summary>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="spec">The specification for filtering articles for student and teacher</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ArticleDto> GetArticleByIdAsync(int courseId, int articleId, IArticleSpecification spec);

    /// <summary>
    /// Create an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="createArticleDto">The Dto containing the information for create new article</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or article is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the teacher is not the one teaching the course</exception>
    Task<ArticleDto> CreateArticleAsync(int courseId, CreateArticleRequestDto createArticleDto);

    /// <summary>
    /// Update an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <param name="updateArticleDto">The Dto containing the information for update article</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the article is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the teacher is not the owner of the article</exception>
    Task<ArticleDto> UpdateArticleAsync(int courseId, int articleId,
        UpdateArticleRequestDto updateArticleDto);

    /// <summary>
    /// Update an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <returns>The task result contains the response when article deleted</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or article is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the teacher is not the owner of the article</exception>
    Task<bool> DeleteArticleAsync(int courseId, int articleId);

    /// <summary>
    /// Mark an article as read
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <param name="studentId">The unique identifier of the student</param>
    /// <returns>The task result contains the response when article marked as read</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or article is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the student is not enrolled in the course</exception>
    Task<UpdateArticleProgressDto> MarkArticleAsReadAsync(int courseId, int articleId, int studentId);

    /// <summary>
    /// Reorders articles within a specified course after validating teacher's permission.
    /// </summary>
    /// <param name="courseId">The unique identifier of the course containing the articles</param>
    /// <param name="articleIds">An array of article IDs in their new desired order</param>
    /// <returns>A collection of updated article DTOs in their new order</returns>
    /// <exception cref="ForbiddenException">Thrown when the teacher doesn't have permission to modify this course</exception>
    /// <exception cref="ConflictException">Thrown when the order's cannot be updated</exception>
    /// <exception cref="ResourceNotFoundException">Thrown when the course or any of the articles cannot be found</exception>
    Task<IEnumerable<ArticleDto>> UpdateArticleOrderAsync(int courseId, int[] articleIds);
}