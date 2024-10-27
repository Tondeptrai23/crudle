using System.Security.Claims;
using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Student;

[Route("api/Student/[controller]")]
[ApiController]
// [Authorize(Roles = CourseRoles.Student)]
[AllowAnonymous]
[Tags("Student Course")]
public class CourseController(UserManager<User> userManager, ICourseService courseService, IStudentService studentService) : ControllerBase
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly ICourseService _courseService = courseService;
    private readonly IStudentService _studentService = studentService;

    [HttpGet]
    public async Task<IActionResult> GetEnrolledCourseAsync()
    {
        var user = await _userManager.GetUserAsync(this.User);
        //TODO: Check null user.
        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        
        var enrolledCourse = await _courseService.GetEnrolledCourseOfAStudentAsync(student.StudentId);
        return Ok(new ResponseDto<IEnumerable<CourseDto>>(enrolledCourse));
    }

    [HttpGet]
    [Route("{courseId:int}")]
    public async Task<IActionResult> GetCourseById(int courseId)
    {
        var course = await _courseService.GetCourseByIdAsync(courseId);
        return Ok(new ResponseDto<CourseDto>(course));
    }
}