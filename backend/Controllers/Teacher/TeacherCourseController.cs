using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Article;
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

    public CourseController(UserManager<User> userManager, ICourseService courseService,
        ITeacherService teacherService, IArticleService articleService, IMapper mapper)
    {
        _mapper = mapper;
        _userManager = userManager;
        _courseService = courseService;
        _teacherService = teacherService;
        _articleService = articleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetEnrolledCoursesAsync([FromQuery] CourseCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }
        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var spec = new TeacherCourseSpecification(teacher.TeacherId);        
        
        var (count, courses) = await _courseService.GetEnrolledCoursesOfUserAsync(queryDto, spec);
        return Ok(new PaginationResponseDto<IEnumerable<CourseDto>>(
            _mapper.Map<IEnumerable<CourseDto>>(courses),
            count,
            queryDto.Page,
            queryDto.Size));
    }
    
    [HttpGet]
    [Route("{courseId:int}")]
    public async Task<IActionResult> GetCourseDetail([FromRoute] int courseId)
    {
        var user = await _userManager.GetUserAsync(this.User);
        if (user == null)
        {
            return Unauthorized();
        }
        
        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }

        var course = await _courseService.GetCourseDetailAsync(courseId);
        return Ok(new ResponseDto<CourseDetailDto>(course));
    }
    
    [HttpGet]
    [Route("{courseId:int}/Articles")]
    public async Task<IActionResult> GetArticles(int courseId, [FromQuery] ArticleCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        } 
        
        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }
        
        var specification = new TeacherArticleSpecification();
        var (count, articles) =
            await _articleService.GetArticlesAsync(courseId, specification, queryDto);
        
        return Ok(new PaginationResponseDto<IEnumerable<TeacherMinimalArticleDto>>(
            _mapper.Map<IEnumerable<TeacherMinimalArticleDto>>(articles),
            count,
            queryDto.Page,
            queryDto.Size));
    }
    
    [HttpGet]
    [Route("{courseId:int}/Article/{articleId:int}")]
    public async Task<IActionResult> GetArticleDetail([FromRoute] int courseId, [FromRoute] int articleId)
    {
        var user = await _userManager.GetUserAsync(this.User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }
        
        IArticleSpecification spec = new TeacherArticleSpecification();
        var result = await _articleService.GetArticleByIdAsync(courseId, articleId, spec);
        return Ok(new ResponseDto<ArticleDto>(result));
    }

    [HttpPost]
    [Route("{courseId:int}/Article")]
    public async Task<IActionResult> CreateArticle([FromRoute] int courseId, CreateArticleRequestDto dto)
    {
        var user = await _userManager.GetUserAsync(this.User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }
        
        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var article = await _articleService.CreateArticleAsync(courseId, dto);
        return Ok(new ResponseDto<TeacherArticleResponseDto>(_mapper.Map<TeacherArticleResponseDto>(article)));
    }

    [HttpPut]
    [Route("{courseId:int}/Article/{articleId:int}")]
    public async Task<IActionResult> UpdateArticle([FromRoute] int courseId, [FromRoute] int articleId,
        UpdateArticleRequestDto dto)
    {
        var user = await _userManager.GetUserAsync(this.User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }
        
        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var article = await _articleService.UpdateArticleAsync(courseId, articleId, dto);
        return Ok(new ResponseDto<TeacherArticleResponseDto>(_mapper.Map<TeacherArticleResponseDto>(article)));
    }
    
    [HttpDelete]
    [Route("{courseId:int}/Article/{articleId:int}")]
    public async Task<IActionResult> DeleteArticle([FromRoute] int courseId, [FromRoute] int articleId)
    {
        var user = await _userManager.GetUserAsync(this.User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }
        
        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var result = await _articleService.DeleteArticleAsync(courseId, articleId);
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
        
        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var article = await _articleService.UpdateArticleOrderAsync(courseId, articleIds);
        return Ok(new ResponseDto<IEnumerable<TeacherMinimalArticleDto>>(
            _mapper.Map<IEnumerable<TeacherMinimalArticleDto>>(article)));
    }
}