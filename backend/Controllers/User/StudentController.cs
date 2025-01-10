using _3w1m.Dtos;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Student;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    private readonly IAssignmentService _assignmentService;
    private readonly IExamService _examService;
    private readonly IArticleService _articleService;

    public StudentController(
        UserManager<User> userManager,
        IStudentService studentService,
        IMapper mapper,
        IAssignmentService assignmentService,
        IExamService examService,
        IArticleService articleService)
    {
        _userManager = userManager;
        _studentService = studentService;
        _mapper = mapper;
        _assignmentService = assignmentService;
        _examService = examService;
        _articleService = articleService;
    }

    [HttpGet]
    [Route("{StudentId:int}")]
    public async Task<IActionResult> GetById([FromRoute] int studentId)
    {
        var student = await _studentService.GetStudentByIdAsync(studentId);
        return Ok(new ResponseDto<StudentDetailDto>(student));
    }


    [HttpGet]
    [Route("Assignment/Upcoming")]
    public async Task<IActionResult> GetUpcomingAssignments(int year, int month)
    {
        month++;
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var response = await _assignmentService.GetAssignmentsByStudentId(student.StudentId, year, month);
        return Ok(new ResponseDto<IEnumerable<UpcomingAssignmentDto>>(response.Item2));
    }
    
    [HttpGet]
    [Route("Exam/Upcoming")]
    public async Task<IActionResult> GetUpcomingExams(int year, int month)
    {
        month++;
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var response = await _examService.GetExamsByStudentId(student.StudentId, year, month);
        return Ok(new ResponseDto<IEnumerable<UpcomingExamDto>>(response.Item2));
    }
    
    [HttpGet]
    [Route("Article/NotRead")]
    public async Task<IActionResult> GetNotReadArticles()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var response = await _articleService.GetNotReadArticlesAsync(student.StudentId);
        return Ok(new ResponseDto<IEnumerable<NotReadArticleDto>>(response));
    }
    
    [HttpGet]
    [Route("Assignment/NotDone")]
    public async Task<IActionResult> GetNotDoneAssignments()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var response = await _assignmentService.GetNotDoneAssignments(student.StudentId);
        return Ok(new ResponseDto<IEnumerable<UpcomingAssignmentDto>>(response));
    }
}