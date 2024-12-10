using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IStudentService _studentService;
    private readonly ITeacherService _teacherService;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public UserController(
        IStudentService studentService,
        ITeacherService teacherService,
        UserManager<User> userManager,
        IMapper mapper)
    {
        _studentService = studentService;
        _teacherService = teacherService;
        _userManager = userManager;
        _mapper = mapper;
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetProfile()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault();

        switch (role)
        {
            case CourseRoles.Student:
                var student = await _studentService.GetStudentByUserIdAsync(user.Id);
                var studentDetail = await _studentService.GetStudentByIdAsync(student.StudentId);
                return Ok(new ResponseDto<StudentDetailDto>(studentDetail));
            case CourseRoles.Teacher:
                var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
                var teacherDetail = await _teacherService.GetTeacherByIdAsync(teacher.TeacherId);
                return Ok(new ResponseDto<TeacherDetailDto>(teacherDetail));
            default:
                return Ok(new ResponseDto<object>(new
                {
                    StudentId = user.Id, // because of we don't have 'AdminId'.
                    Email = user.Email,
                    Fullname = "System Admin",
                }));
        }
    }
}