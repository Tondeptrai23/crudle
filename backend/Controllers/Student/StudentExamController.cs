using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Student;

[ApiController]
[Route("api/Student/Course/{courseId:int}/Exam")]
[Authorize(Roles = CourseRoles.Student)]
[Tags("Student Exam")]
public class StudentExamController : Controller
{
    private readonly IExamService _examService;
    private readonly IStudentService _studentService;
    private readonly ICourseService _courseService;
    private readonly IExamSubmissionService _examSubmissionService;
    private readonly UserManager<User> _userManager;

    public StudentExamController(IExamService examService, IStudentService studentService, ICourseService courseService,
        UserManager<User> userManager, IExamSubmissionService examSubmissionService)
    {
        _examService = examService;
        _studentService = studentService;
        _courseService = courseService;
        _userManager = userManager;
        _examSubmissionService = examSubmissionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetExamsAsync([FromRoute] int courseId, [FromQuery] ExamQueryCollectionDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }
        
        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        
        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in this course.");
        }
        
        var (total, exams) = await _examService.GetExamsAsync(courseId, student.StudentId, queryDto);
        
        return Ok(new PaginationResponseDto<IEnumerable<ExamMinimalDto>>(
            exams,
            total,
            queryDto.Page,
            queryDto.Size));    
    }
    
    [HttpGet]
    [Route("{examId:int}")]
    public async Task<IActionResult> GetDetailExamAsync([FromRoute] int courseId, [FromRoute] int examId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }
        
        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        
        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in this course.");
        }
        
        var exam = await _examService.GetDetailExamForStudentAsync(courseId, examId, student.StudentId);
        
        return Ok(new ResponseDto<ExamStudentResponseDto>(exam));
    }
    
    [HttpPost]
    [Route("{examId:int}/Start")]
    public async Task<IActionResult> StartExamAsync([FromRoute] int courseId, [FromRoute] int examId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in this course.");
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var examSubmissionResponse = await _examService.StartExamAsync(courseId, examId, student.StudentId);

        return Ok(new ResponseDto<ExamStartResponseDto>(examSubmissionResponse));
    }

    [HttpPost]
    [Route("{examId:int}/Submit")]
    public async Task<IActionResult> SubmitExamAsync([FromRoute] int courseId, [FromRoute] int examId,
        [FromBody] ExamSubmissionRequestDto examSubmissionRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in this course.");
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var examSubmissionResponse = await _examService.SubmitExamAsync(courseId, examId, student.StudentId,
            examSubmissionRequestDto);

        return Ok(new ResponseDto<ExamSubmissionResponseDto>(examSubmissionResponse));
    }
    
    [HttpGet]
    [Route("{examId:int}/Submission")]
    public async Task<IActionResult> GetExamSubmissionsAsync([FromRoute] int courseId, [FromRoute] int examId,
        [FromQuery] ExamSubmissionQueryCollectionDto queryCollectionDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in this course.");
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var (total, examSubmissions) = await _examSubmissionService.GetExamSubmissionsHistoryAsync(courseId, examId, student.StudentId, queryCollectionDto);

        return Ok(new PaginationResponseDto<IEnumerable<ExamSubmissionMinimalDto>>(
            examSubmissions,
            total,
            queryCollectionDto.Page,
            queryCollectionDto.Size));
    }
    
    [HttpGet]
    [Route("{examId:int}/Submission/{examSubmissionId:int}")]
    public async Task<IActionResult> GetDetailExamSubmissionAsync([FromRoute] int courseId, [FromRoute] int examId,
        [FromRoute] int examSubmissionId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This student is not enrolled in this course.");
        }

        var student = await _studentService.GetStudentByUserIdAsync(user.Id);
        var examSubmission = await _examSubmissionService.GetDetailExamSubmissionStudentAsync(courseId, examId, student.StudentId, examSubmissionId);

        return Ok(new ResponseDto<ExamSubmissionForStudentDto>(examSubmission));
    }
}