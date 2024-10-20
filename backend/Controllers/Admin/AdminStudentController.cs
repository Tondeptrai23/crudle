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
    public async Task<IActionResult> GetStudentsAsync([FromQuery] StudentCollectionQueryDto request)
    {
        var (count, students) = await _studentService.GetStudentsAsync(request);
        
        return Ok(new PaginationResponseDto<IEnumerable<StudentDto>>(students, count, request.Page, request.Size));
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