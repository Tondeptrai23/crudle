using _3w1m.Data;
using _3w1m.Dtos.Questions;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class QuestionService : IQuestionService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public QuestionService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<QuestionDto>> CreateMultipleQuestionAsync(int assignmentId,
        CreateMultipleQuestionRequestDto createMultipleQuestionRequestDto)
    {
        var assignments = await _context.Assignments.FirstOrDefaultAsync(asgmt => asgmt.AssignmentId == assignmentId);
        if (assignments == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        var listQuestion = _mapper.Map<List<Question>>(createMultipleQuestionRequestDto.Questions);
        foreach (var question in listQuestion)
        {
            question.AssignmentId = assignmentId;
            foreach (var questionAnswer in question.Answers)
            {
                questionAnswer.QuestionId = question.QuestionId;
            }
            _context.Answers.AddRange(question.Answers);
        }

        _context.Questions.AddRange(listQuestion);
        await _context.SaveChangesAsync();

        return _mapper.Map<IEnumerable<QuestionDto>>(listQuestion);
    }

    public async Task<bool> DeleteQuestionAsync(int assignmentId, int questionId)
    {
        var assignments = await _context.Assignments.FirstOrDefaultAsync(asgmt => asgmt.AssignmentId == assignmentId);
        if (assignments == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        var question = await _context.Questions.FirstOrDefaultAsync(q => q.QuestionId == questionId && q.AssignmentId == assignmentId);
        if (question == null)
        {
            throw new ResourceNotFoundException("Question not found");
        }

        _context.Questions.Remove(question);
        
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<QuestionDto> ReplaceQuestionAsync(int assignmentId, int questionId,
        ReplaceQuestionRequestDto replaceQuestionRequestDto)
    {
        var assignments = await _context.Assignments.FirstOrDefaultAsync(asgmt => asgmt.AssignmentId == assignmentId);
        if (assignments == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }
        
        var question = _context.Questions.Include(q => q.Answers).FirstOrDefault(q => q.QuestionId == questionId && q.AssignmentId == assignmentId);
        if (question == null)
        {
            throw new ResourceNotFoundException("Question not found");
        }

        if (replaceQuestionRequestDto.Content != null)
        {
            question.Content = replaceQuestionRequestDto.Content;
        }        
        
        if (replaceQuestionRequestDto.Type != null)
        {
            question.Type = replaceQuestionRequestDto.Type;
        }
        
        if (replaceQuestionRequestDto.Answers != null)
        {
            var listAnswer = _mapper.Map<List<Answer>>(replaceQuestionRequestDto.Answers);
            question.Answers = listAnswer;
        }
        
        await _context.SaveChangesAsync();
        
        return _mapper.Map<QuestionDto>(question);
    }
}