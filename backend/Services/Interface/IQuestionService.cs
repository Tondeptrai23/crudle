using _3w1m.Dtos.Questions;
using _3w1m.Models.Exceptions;

namespace _3w1m.Services.Interface;

public interface IQuestionService
{
    /// <summary>
    /// Create multiple questions for an assignment
    /// </summary>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="createMultipleQuestionRequestDto">The Dto containing the information for create new questions</param>
    /// <returns>The task result contains a collection of question Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the assignment is not found</exception>
    public Task<IEnumerable<QuestionDto>> CreateMultipleQuestionAsync(int assignmentId,
        CreateMultipleQuestionRequestDto createMultipleQuestionRequestDto);

    /// <summary>
    /// Delete a question
    /// </summary>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="questionId">The unique identifier of the question</param>
    /// <returns>The task result contains the boolean value indicating the success of the operation</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the assignment is not found</exception>
    public Task<bool> DeleteQuestionAsync(int assignmentId, int questionId);

    /// <summary>
    /// Replace a question
    /// </summary>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="questionId">The unique identifier of the question</param>
    /// <param name="replaceQuestionRequestDto">The Dto containing the information for replace the question</param>
    /// <returns>The task result contains the question Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the assignment is not found</exception>
    public Task<QuestionDto> ReplaceQuestionAsync(int assignmentId, int questionId,
        ReplaceQuestionRequestDto replaceQuestionRequestDto);
}