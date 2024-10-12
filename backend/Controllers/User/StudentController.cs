using _3w1m.Dtos;
using _3w1m.Dtos.Student;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.User;

[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;
    
    public StudentController(IStudentService studentService)
    {
        _studentService = studentService;
    }
    
    [HttpGet]
    [Route("{StudentId:int}")]
    public async Task<IActionResult> GetById([FromRoute] int studentId)
    {
        var student = await _studentService.GetStudentByIdAsync(studentId);
        return Ok(new ResponseDto<StudentDto>(student));
    }
}