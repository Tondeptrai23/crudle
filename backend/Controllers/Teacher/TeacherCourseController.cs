﻿using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Course;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Teacher;

[Route("api/Teacher/[controller]")]
[ApiController]
[Authorize(Roles = CourseRoles.Teacher)]
[Tags("Teacher Course")]
public class CourseController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ICourseService _courseService;
    private readonly ITeacherService _teacherService;
    private readonly IArticleService _articleService;
    private readonly IMapper _mapper;
    private readonly IAssignmentService _assignmentService;

    public CourseController(UserManager<User> userManager, ICourseService courseService,
        ITeacherService teacherService, IArticleService articleService, IMapper mapper,
        IAssignmentService assignmentService)
    {
        _mapper = mapper;
        _userManager = userManager;
        _courseService = courseService;
        _teacherService = teacherService;
        _articleService = articleService;
        _assignmentService = assignmentService;
    }

    [HttpGet]
    [Route("Detail/{courseId:int}")]
    public async Task<IActionResult> GetCoursesDetail([FromRoute] int courseId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
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

    [HttpGet]
    [Route("{courseId:int}/Articles")]
    public async Task<IActionResult> GetArticles(int courseId, [FromQuery] ArticleCollectionQueryDto queryDto)
    {
        var specification = new TeacherArticleSpecification();
        var (count, articles) =
            await _articleService.GetArticlesAsync(courseId, specification, queryDto);

        return Ok(new PaginationResponseDto<IEnumerable<TeacherMinimalArticleDto>>(
            _mapper.Map<IEnumerable<TeacherMinimalArticleDto>>(articles),
            count,
            queryDto.Page,
            queryDto.Size));
    }

    [HttpPost]
    [Route("{courseId:int}/Article")]
    public async Task<IActionResult> CreateArticle([FromRoute] int courseId, CreateArticleRequestDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var article = await _articleService.CreateArticleAsync(courseId, teacher.TeacherId, dto);
        return Ok(new ResponseDto<TeacherArticleResponseDto>(_mapper.Map<TeacherArticleResponseDto>(article)));
    }

    [HttpPut]
    [Route("{courseId:int}/Article/{articleId:int}")]
    public async Task<IActionResult> UpdateArticle([FromRoute] int courseId, [FromRoute] int articleId,
        UpdateArticleRequestDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var article = await _articleService.UpdateArticleAsync(courseId, articleId, teacher.TeacherId, dto);
        return Ok(new ResponseDto<TeacherArticleResponseDto>(_mapper.Map<TeacherArticleResponseDto>(article)));
    }

    [HttpDelete]
    [Route("{courseId:int}/Article/{articleId:int}")]
    public async Task<IActionResult> DeleteArticle([FromRoute] int courseId, [FromRoute] int articleId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var result = await _articleService.DeleteArticleAsync(courseId, articleId, teacher.TeacherId);
        return Ok(new GeneralDeleteResponseDto { Success = result });
    }

    [HttpPatch]
    [Route("{courseId:int}/Article/Order")]
    public async Task<IActionResult> UpdateArticleOrderAsync([FromRoute] int courseId, [FromBody] int[] articleIds)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var article = await _articleService.UpdateArticleOrderAsync(courseId, articleIds, teacher.TeacherId);
        return Ok(new ResponseDto<IEnumerable<TeacherMinimalArticleDto>>(
            _mapper.Map<IEnumerable<TeacherMinimalArticleDto>>(article)));
    }

    [HttpPost]
    [Route("{courseId:int}/Assignments")]
    public async Task<IActionResult> CreateAssignment([FromRoute] int courseId,
        [FromBody] CreateAssignmentRequestDto createAssignmentRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }

        var assignment = await _assignmentService.CreateAssignmentAsync(courseId, createAssignmentRequestDto);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }


    [HttpGet]
    [Route("{courseId:int}/Assignments")]
    public async Task<IActionResult> GetAssignments([FromRoute] int courseId,
        [FromQuery] AssignmentCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }

        var (count, assignments) = await _assignmentService.GetAssignmentsAsync(courseId, queryDto);
        return Ok(new PaginationResponseDto<IEnumerable<AssignmentDto>>(assignments, count, queryDto.Page,
            queryDto.Size));
    }
}