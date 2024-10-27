using System.Security.Claims;
using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Teacher;

[Route("api/Teacher/[controller]")]
[ApiController]
// [Authorize(Roles = CourseRoles.Teacher)]
[AllowAnonymous]
[Tags("Teacher Course")]
public class CourseController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ICourseService _courseService;
    private readonly ITeacherService _teacherService;

    public CourseController(UserManager<User> userManager, ICourseService courseService,
        ITeacherService teacherService)
    {
        _userManager = userManager;
        _courseService = courseService;
        _teacherService = teacherService;
    }

    [HttpGet]
    [Route("Detail/{courseId:int}")]
    public async Task<IActionResult> GetCoursesDetail([FromRoute] int courseId)
    {
        var user = await _userManager.GetUserAsync(this.User);
        if (user == null) {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var course = await _courseService.GetCourseDetailAsync(teacher.TeacherId, courseId);
        return Ok(new ResponseDto<CourseDetailDto>(course));
        throw new NotImplementedException();
    }

    
    [HttpGet]
    [Route("{courseId:int}")]
    public async Task<IActionResult> GetCourseById(int courseId)
    {
        var course = await _courseService.GetCourseByIdAsync(courseId);
        return Ok(new ResponseDto<CourseDto>(course));
    }
}