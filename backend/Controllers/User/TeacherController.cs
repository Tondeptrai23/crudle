using _3w1m.Dtos;
using _3w1m.Dtos.Teacher;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.User;

[Route("api/User/[controller]")]
public class TeacherController : ControllerBase
{
    private readonly ITeacherService _teacherService;

    public TeacherController(ITeacherService teacherService)
    {
        _teacherService = teacherService;
    }

    [HttpGet]
    [Route("{teacherId:int}")]
    public async Task<IActionResult> GetTeacherById([FromRoute] int teacherId)
    {
        var teacherDto = await _teacherService.GetTeacherByIdAsync(teacherId);
        return Ok(new ResponseDto<TeacherDetailDto>(teacherDto));
    }
}