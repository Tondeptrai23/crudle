﻿using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Teacher;

[Route("api/Teacher/{courseId:int}/Exams")]
[ApiController]
[Authorize(Roles = CourseRoles.Teacher)]
[Tags("Teacher Exam")]
public class TeacherExamController : Controller
{
    private readonly IExamService _examService;
    private readonly ITeacherService _teacherService;
    private readonly ICourseService _courseService;
    private readonly UserManager<User> _userManager;

    public TeacherExamController(IExamService examService, ITeacherService teacherService, ICourseService courseService,
        UserManager<User> userManager)
    {
        _examService = examService;
        _teacherService = teacherService;
        _courseService = courseService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetExamsAsync([FromRoute] int courseId,
        [FromQuery] ExamQueryCollectionDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);

        if (await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id) == false)
        {
            throw new ForbiddenException("You are not enrolled in this course");
        }

        var (total, exams) = await _examService.GetExamsAsync(courseId, teacher.TeacherId, queryDto);
        return Ok(new PaginationResponseDto<IEnumerable<ExamMinimalDto>>(
            exams,
            total,
            queryDto.Page,
            queryDto.Size));
    }

    [HttpGet]
    [Route("{examId:int}")]
    public async Task<IActionResult> GetDetailExamAsync([FromRoute] int courseId, [FromRoute] int examId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);

        if (await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id) == false)
        {
            throw new ForbiddenException("You are not enrolled in this course");
        }

        var exam = await _examService.GetDetailExamForTeacherAsync(courseId, examId, teacher.TeacherId);
        return Ok(new ResponseDto<ExamDto>(exam));
    }

    [HttpPost]
    [Route("{examId:int}")]
    public async Task<IActionResult> CreateExamAsync([FromRoute] int courseId, [FromRoute] int examId,
        [FromBody] CreateExamRequestDto createExamRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);

        if (await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id) == false)
        {
            throw new ForbiddenException("You are not enrolled in this course");
        }

        var exam = await _examService.CreateExamAsync(courseId, teacher.TeacherId, examId, createExamRequestDto);
        return Ok(new ResponseDto<ExamDto>(exam));
    }
    
    [HttpPut]
    [Route("{examId:int}")]
    public async Task<IActionResult> UpdateExamAsync([FromRoute] int courseId, [FromRoute] int examId,
        [FromBody] UpdateExamRequestDto updateExamRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);

        if (await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id) == false)
        {
            throw new ForbiddenException("You are not enrolled in this course");
        }

        var exam = await _examService.UpdateExamAsync(courseId, teacher.TeacherId, examId, updateExamRequestDto);
        return Ok(new ResponseDto<ExamDto>(exam));
    }
    
    [HttpPatch]
    [Route("{examId:int}")]
    public async Task<IActionResult> UpdatePartiallyExamAsync([FromRoute] int courseId, [FromRoute] int examId,
        [FromBody] UpdateMinimalExamRequestDto updateMinimalExamRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);

        if (await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id) == false)
        {
            throw new ForbiddenException("You are not enrolled in this course");
        }

        var exam = await _examService.UpdatePartiallyExamAsync(courseId, teacher.TeacherId, examId, updateMinimalExamRequestDto);
        return Ok(new ResponseDto<ExamMinimalDto>(exam));
    }
}