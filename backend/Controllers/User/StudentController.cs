using _3w1m.Dtos;
using _3w1m.Dtos.Student;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;
    
    public StudentController(IStudentService studentService)
    {
        _studentService = studentService;
    }
    
    [HttpGet]
    [Route("{StudentId:int}")]
    public async Task<IActionResult> GetById([FromRoute] int StudentId)
    {
        var student = await _studentService.GetStudentByIdAsync(StudentId);
        return Ok(new ResponseDto<StudentDto>(student));
    }
}