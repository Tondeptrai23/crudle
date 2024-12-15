using _3w1m.Dtos.Questions;
using _3w1m.Models.Domain;

namespace _3w1m.Services.Interface;

public interface IQuestionService
{
    public Task<IEnumerable<QuestionDto>> CreateMultipleQuestionAsync(int assignmentId, CreateMultipleQuestionRequestDto createMultipleQuestionRequestDto);
    public Task<bool> DeleteQuestionAsync(int assignmentId, int questionId);
    public Task<QuestionDto> ReplaceQuestionAsync(int assignmentId,int questionId, ReplaceQuestionRequestDto replaceQuestionRequestDto);
}