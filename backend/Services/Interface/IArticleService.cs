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
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ArticleDetailDto> GetArticleByIdAsync(int articleId, int courseId);

    /// <summary>
    /// Create an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="createDto">The Dto containing the information for create new article</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or article is not found</exception>
    Task<ArticleDetailDto> CreateArticleAsync(int courseId, CreateRequestArticleDto createDto);

    /// <summary>
    /// Update an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <param name="updateDto">The Dto containing the information for update article</param>
    /// <returns>The task result contains the article detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the article is not found</exception>
    Task<ArticleDetailDto> UpdateArticleAsync(int courseId, int articleId, UpdateRequestArticleDto updateDto);
    
    /// <summary>
    /// Update an article
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="articleId">The unique identifier of the article</param>
    /// <returns>The task result contains the response when article deleted</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or article is not found</exception>
    Task<DeleteResponseArticleDto> DeleteArticleAsync(int courseId, int articleId);
}