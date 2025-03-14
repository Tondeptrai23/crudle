﻿using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
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
    [Route("{courseId:int}")]
    public async Task<IActionResult> GetCourse([FromRoute] int courseId)
    {
        var course = await courseService.GetCourseByIdAsync(courseId);
        return Ok(new ResponseDto<CourseDto>(course));
    }

    [HttpGet]
    [Route("{courseId:int}/Students")]
    public async Task<IActionResult> GetStudentsInCourse([FromRoute] int courseId)
    {
        var (_, students) = await courseService.GetStudentsInCourseAsync(courseId);
        return Ok(new ResponseDto<IEnumerable<StudentDto>>(students));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] CreateCourseRequestDto data)
    {
        var course = await courseService.CreateCourseAsync(data);
        return Ok(new ResponseDto<CourseDto>(course));
    }

    [HttpPatch]
    [Route("{courseId:int}")]
    public async Task<IActionResult> UpdateCourse([FromRoute] int courseId, [FromBody] UpdateRequestCourseDto requestCourseData)
    {
        var course = await courseService.UpdateCourseAsync(courseId, requestCourseData);
        return Ok(new ResponseDto<CourseDto>(course));
    }

    [HttpPut]
    [Route("{courseId:int}/Enrollments")]
    public async Task<IActionResult> ChangeCourseEnrollments([FromRoute] int courseId, [FromBody] EnrollmentRequestDto enrollRequest)
    {
        var students = await courseService.UpdateEnrollmentsAsync(courseId, enrollRequest);
        return Ok(new ResponseDto<EnrollmentRequestDto>(enrollRequest));
    }
}