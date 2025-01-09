using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Course;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications;
using _3w1m.Specifications.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Student;

[Route("api/Student/[controller]")]
[ApiController]
[Authorize(Roles = CourseRoles.Student)]
[Tags("Student Course")]
public class CourseController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ICourseService _courseService;
    private readonly IStudentService _studentService;
    private readonly IArticleService _articleService;
    private readonly IAssignmentService _assignmentService;
    private readonly IMapper _mapper;

    public CourseController(UserManager<User> userManager, ICourseService courseService, IStudentService studentService,
        IArticleService articleService, IAssignmentService assignmentService, IMapper mapper)
    {
        _userManager = userManager;
        _courseService = courseService;
        _studentService = studentService;
        _articleService = articleService;
        _assignmentService = assignmentService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetEnrolledCoursesAsync([FromQuery] CourseCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var spec = new StudentCourseSpecification(student.StudentId);
        var (courseCount, courses) = await _courseService.GetEnrolledCoursesOfUserAsync(queryDto, spec);

        return Ok(new PaginationResponseDto<IEnumerable<CourseMinimalDto>>(
            _mapper.Map<IEnumerable<CourseMinimalDto>>(courses),
            courseCount,
            queryDto.Page,
            queryDto.Size));
    }


    [HttpGet]
    [Route("{courseId:int}")]
    public async Task<IActionResult> GetCourseById(int courseId)
    {
        var course = await _courseService.GetCourseByIdAsync(courseId);
        return Ok(new ResponseDto<CourseDto>(course));
    }

    [HttpGet]
    [Route("{courseId:int}/Article/{articleId:int}")]
    public async Task<IActionResult> GetArticleByIdAsync([FromRoute] int courseId, [FromRoute] int articleId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in the course");
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        IArticleSpecification spec = new StudentArticleSpecification(student.StudentId);
        var article = await _articleService.GetArticleByIdAsync(courseId, articleId, spec);
        return Ok(new ResponseDto<StudentArticleResponseDto>(_mapper.Map<StudentArticleResponseDto>(article)));
    }

    [HttpGet]
    [Route("{courseId:int}/Articles")]
    public async Task<IActionResult> GetArticlesAsync([FromRoute] int courseId,
        [FromQuery] ArticleCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in the course");
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);

        var specification = new StudentArticleSpecification(student.StudentId);

        var (articleCount, articles) = await _articleService.GetArticlesAsync(courseId, specification, queryDto);

        return Ok(new PaginationResponseDto<IEnumerable<StudentMinimalArticleDto>>(
            _mapper.Map<IEnumerable<StudentMinimalArticleDto>>(articles),
            articleCount,
            queryDto.Page,
            queryDto.Size));
    }
    
    
    [HttpGet]
    [Route("{courseId:int}/Assignment")]
    public async Task<IActionResult> GetAssignments([FromRoute] int courseId, [FromQuery] AssignmentCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in the course");
        }

        var specification = new StudentAssignmentSpecification();

        var (count, assignments) = await _assignmentService.GetAssignmentsAsync(courseId, specification, queryDto);
        return Ok(new PaginationResponseDto<IEnumerable<AssignmentDto>>(assignments, count, queryDto.Page, queryDto.Size));
    }
}