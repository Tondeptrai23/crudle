using _3w1m.Dtos;
using _3w1m.Dtos.Assignment;
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

    public StudentController(
        UserManager<User> userManager,
        IStudentService studentService,
        IMapper mapper,
        IAssignmentService assignmentService)
    {
        _userManager = userManager;
        _studentService = studentService;
        _mapper = mapper;
        _assignmentService = assignmentService;
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
}