using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Questions;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Teacher;

[ApiController]
[Authorize(Roles = CourseRoles.Teacher)]
[Route("api/Teacher/[controller]")]
[Tags("Teacher Question")]
public class QuestionController: Controller
{
    private readonly IQuestionService _questionService;

    public QuestionController(IQuestionService questionService)
    {
        _questionService = questionService;
    }
    
    [HttpPost]
    [Route("{assignmentId:int}/Questions")]
    public async Task<IActionResult> CreateMultipleQuestion([FromRoute] int assignmentId, [FromBody] CreateMultipleQuestionRequestDto createMultipleQuestionRequestDto)
    {
        var questions = await _questionService.CreateMultipleQuestionAsync(assignmentId, createMultipleQuestionRequestDto);
        return Ok(new ResponseDto<IEnumerable<QuestionDto>>(questions));
    }
    
    [HttpDelete]
    [Route("{assignmentId:int}/Questions/{questionId:int}")]
    public async Task<IActionResult> DeleteQuestion([FromRoute] int assignmentId, [FromRoute] int questionId)
    {
        await _questionService.DeleteQuestionAsync(assignmentId, questionId);
        return Ok(new ResponseDto<string>("Deleted!"));
    }
    
    [HttpPut]
    [Route("{assignmentId:int}/Questions/{questionId:int}")]
    public async Task<IActionResult> ReplaceQuestion([FromRoute] int assignmentId, [FromRoute] int questionId, [FromBody] ReplaceQuestionRequestDto replaceQuestionRequestDto)
    {
        var question = await _questionService.ReplaceQuestionAsync(assignmentId, questionId, replaceQuestionRequestDto);
        return Ok(new ResponseDto<QuestionDto>(question));
    }
}