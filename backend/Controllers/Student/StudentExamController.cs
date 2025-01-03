using _3w1m.Constants;
using _3w1m.Dtos;
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
    private readonly UserManager<User> _userManager;

    public StudentExamController(IExamService examService, IStudentService studentService, ICourseService courseService,
        UserManager<User> userManager)
    {
        _examService = examService;
        _studentService = studentService;
        _courseService = courseService;
        _userManager = userManager;
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
}