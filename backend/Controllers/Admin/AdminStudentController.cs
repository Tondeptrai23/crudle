using _3w1m.Dtos;
using _3w1m.Dtos.Student;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Admin;

[ApiController]
[Route("api/Admin/[controller]")]
// [Authorize(Roles = "Admin")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;
    private readonly IMapper _mapper;
    
    public StudentController(IStudentService studentService, IMapper mapper)
    {
        _studentService = studentService;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetStudentsAsync()
    {
        var students = await _studentService.GetStudentsAsync();
        return Ok(new ResponseDto<IEnumerable<StudentDto>>(students));
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateStudentAsync([FromBody] CreateStudentRequestDto student)
    {
        var newStudent = await _studentService.CreateStudentAsync(student);
        
        return Ok(new ResponseDto<StudentDto>(newStudent));
    }

    [HttpGet]
    [Route("{StudentId:int}")]
    public async Task<IActionResult> GetStudentByIdAsync([FromRoute] int StudentId)
    {
        var student = await _studentService.GetStudentByIdAsync(StudentId);
        return Ok(new ResponseDto<StudentDetailDto>(student));
    }

    [Route("{StudentId:int}")]
    [HttpPatch]
    public async Task<IActionResult> UpdateStudentAsync([FromBody] UpdateStudentRequestDto request, [FromRoute] int StudentId)
    {
        var updatedStudent = await _studentService.UpdateStudentAsync(StudentId, request);
        
        return Ok(new ResponseDto<StudentDto>(updatedStudent));
    }
}