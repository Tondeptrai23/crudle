using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Assignment;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications;
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
    public async Task<IActionResult> GetEnrolledCourseAsync()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

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

    [HttpGet]
    [Route("{courseId:int}/Article/{articleId:int}")]
    public async Task<IActionResult> GetArticleByIdAsync([FromRoute] int courseId, [FromRoute] int articleId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);

        var article = await _articleService.GetArticleByIdAsync(articleId, courseId, student.StudentId);
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
    [Route("{courseId:int}/Assignments")]
    public async Task<IActionResult> GetAssignments([FromRoute] int courseId, [FromQuery] AssignmentCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }
        
        var (count, assignments) = await _assignmentService.GetAssignmentsAsync(courseId, queryDto);
        return Ok(new PaginationResponseDto<IEnumerable<AssignmentDto>>(assignments, count, queryDto.Page, queryDto.Size));
    }
    
    [HttpGet]
    [Route("{courseId:int}/Assignments/{assignmentId:int}")]
    public async Task<IActionResult> GetAssignmentById([FromRoute] int courseId, [FromRoute] int assignmentId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }
        
        if (await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in this course.");
        }
        
        var assignment = await _assignmentService.GetAssignmentAsync(courseId, assignmentId);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }
}