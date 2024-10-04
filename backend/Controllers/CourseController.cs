using _3w1m.Dtos;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly ICourseService _courseService;
    private readonly IMapper _mapper;
    
    public CourseController(ICourseService courseService, IMapper mapper)
    {
        _courseService = courseService;
        _mapper = mapper;
    }
    
    [HttpGet]
    [Route(template:"{courseId}")]
    public async Task<IActionResult> GetById(int courseId)
    {
        var course = await _courseService.GetByIdAsync(courseId);
        return Ok(new
            {
                Success = true,
                Data = course
            }
        );
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var courses = await _courseService.GetAllAsync();
        return Ok(new
            {
                Success = true,
                Data = courses
            }
        );
    }
    
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CreateRequestCourseDto request)
    {
        var course = await _courseService.AddAsync(request);
        return Ok(new
            {
                Success = true,
                Data = course
            }
        );
    }
}