using _3w1m.Dtos;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TeacherController : ControllerBase
{
    private readonly ITeacherService _teacherService;
    private readonly IAssignmentService _assignmentService;
    private readonly UserManager<User> _userManager;
    private readonly IExamService _examService;

    public TeacherController(ITeacherService teacherService, IAssignmentService assignmentService, UserManager<User> userManager, IExamService examService)
    {
        _teacherService = teacherService;
        _assignmentService = assignmentService;
        _userManager = userManager;
        _examService = examService;
    }

    [HttpGet]
    [Route("{teacherId:int}")]
    public async Task<IActionResult> GetTeacherById([FromRoute] int teacherId)
    {
        var teacherDto = await _teacherService.GetTeacherByIdAsync(teacherId);
        return Ok(new ResponseDto<TeacherDto>(teacherDto));
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

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var response = await _assignmentService.GetAssignmentsByTeacherId(teacher.TeacherId, year, month);
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

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var response = await _examService.GetExamsByStudentId(teacher.TeacherId, year, month);
        return Ok(new ResponseDto<IEnumerable<UpcomingExamDto>>(response.Item2));
    }
}