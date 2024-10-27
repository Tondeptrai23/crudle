using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Admin;

[Route("api/Admin/[controller]")]
[ApiController]
[Authorize(Roles = CourseRoles.Admin)]
[Tags("Admin Course")]
public class CourseController(ICourseService courseService) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetCourses([FromQuery] CourseCollectionQueryDto queryDto)
    {
        var (count, courses) = await courseService.GetCoursesAsync(queryDto);
        return Ok(new PaginationResponseDto<IEnumerable<CourseDto>>(courses, count, queryDto.Page, queryDto.Size));
    }

    [HttpGet]
    [Route("{courseId:int}/Students")]
    public async Task<IActionResult> GetStudentsInCourse([FromRoute] int courseId) {
        var (count, students) = await courseService.GetStudentsInCourseAsync(courseId);
        return Ok(new ResponseDto<IEnumerable<StudentDto>>(students));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] CreateRequestCourseDto courseData)
    {
        var course = await courseService.CreateCourseAsync(courseData);
        return Ok(new ResponseDto<CourseDto>(course));
    }

    [HttpPatch]
    [Route("{courseId:int}")]
    public async Task<IActionResult> UpdateCourse([FromRoute] int courseId, [FromBody] UpdateCourseRequestDto courseData)
    {
        var course = await courseService.UpdateCourseAsync(courseId, courseData);
        return Ok(new ResponseDto<CourseDto>(course));
    } 

    [HttpPost]
    [Route("{courseId:int}/Enroll")]
    public async Task<IActionResult> EnrollStudentIntoCourse([FromRoute] int courseId, [FromBody] List<int> studentIds)
    {
        var students = await courseService.EnrollStudentIntoCourseAsync(courseId, studentIds);
        return Ok(new ResponseDto<IEnumerable<StudentDto>>(students));
    }
}
