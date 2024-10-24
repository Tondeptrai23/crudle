using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Teacher;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Admin;

[ApiController]
[Route("api/Admin/[controller]")]
[Authorize(Roles = CourseRoles.Admin)]
[Tags("Admin Teacher")]
public class TeacherController : Controller
{
    private readonly ITeacherService _teacherService;

    public TeacherController(ITeacherService teacherService)
    {
        _teacherService = teacherService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTeacher([FromQuery] TeacherCollectionQueryDto queryDto)
    {
        var (count, teachers) = await _teacherService.GetTeachersAsync(queryDto);

        return Ok(new PaginationResponseDto<IEnumerable<TeacherDto>>(teachers, count, queryDto.Page, queryDto.Size));
    }

    [HttpPost]
    public async Task<IActionResult> CreateTeacher([FromBody] CreateTeacherRequestDto teacherData)
    {
        var teacher = await _teacherService.CreateTeacherAsync(teacherData);
        return Ok(new ResponseDto<TeacherDto>(teacher));
    }

    [HttpPatch]
    [Route("{teacherId:int}")]
    public async Task<IActionResult> UpdateTeacher([FromBody] UpdateTeacherRequestDto teacherData,
        [FromRoute] int teacherId)
    {
        var teacher = await _teacherService.UpdateTeacherAsync(teacherId, teacherData);
        return Ok(new ResponseDto<TeacherDto>(teacher));
    }
}