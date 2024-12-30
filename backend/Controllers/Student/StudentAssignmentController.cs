using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Assignment;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Student;

[Route("api/Student/Course/{courseId:int}/Assignment")]
[ApiController]
[Authorize(Roles = CourseRoles.Student)]
[Tags("Student Assignment")]
public class StudentAssignmentController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ICourseService _courseService;
    private readonly IStudentService _studentService;
    private readonly IArticleService _articleService;
    private readonly IAssignmentService _assignmentService;
    private readonly IAssignmentSubmissionService _assignmentSubmissionService;
    private readonly IMapper _mapper;

    public StudentAssignmentController(UserManager<User> userManager, ICourseService courseService,
        IStudentService studentService,
        IArticleService articleService, IAssignmentService assignmentService,
        IAssignmentSubmissionService assignmentSubmissionService, IMapper mapper)
    {
        _userManager = userManager;
        _courseService = courseService;
        _studentService = studentService;
        _articleService = articleService;
        _assignmentService = assignmentService;
        _assignmentSubmissionService = assignmentSubmissionService;
        _mapper = mapper;
    }

    [HttpGet]
    [Route("{assignmentId:int}")]
    public async Task<IActionResult> GetAssignmentById([FromRoute] int courseId, [FromRoute] int assignmentId)
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

        var specification = new StudentAssignmentSpecification();

        var assignment = await _assignmentService.GetAssignmentAsync(courseId, assignmentId, specification);
        return Ok(new ResponseDto<AssignmentForStudentDto>(_mapper.Map<AssignmentForStudentDto>(assignment)));
    }

    [HttpPost]
    [Route("{assignmentId:int}/Start")]
    public async Task<IActionResult> StartAssignment([FromRoute] int courseId, [FromRoute] int assignmentId)
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
        var response = await _assignmentService.StartAssignmentAsync(courseId, assignmentId, student.StudentId);
        return Ok(new ResponseDto<AssignmentStartResponseDto>(response));
    }

    [HttpGet]
    [Route("{assignmentId:int}/Resume/{submissionId:int}")]
    public async Task<IActionResult> ResumeAssignment([FromRoute] int courseId, [FromRoute] int assignmentId,
        [FromRoute] int submissionId)
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

        var response = await _assignmentService.ResumeAssignmentAsync(submissionId);
        return Ok(new ResponseDto<AssignmentStartResponseDto>(response));
    }

    [HttpPost]
    [Route("{assignmentId:int}/Submit")]
    public async Task<IActionResult> SubmitAssignment([FromRoute] int courseId, [FromRoute] int assignmentId,
        [FromBody] AssignmentSubmissionRequestDto submitAssignmentDto)
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
        var response =
            await _assignmentService.SubmitAssignmentAsync(courseId, assignmentId, student.StudentId,
                submitAssignmentDto);
        return Ok(new ResponseDto<AssignmentSubmissionResponseDto>(response));
    }


    [HttpGet]
    [Route("{assignmentId:int}/Submissions")]
    public async Task<IActionResult> GetSubmissionsHistory([FromRoute] int courseId, [FromRoute] int assignmentId,
        [FromQuery] AssignmentSubmissionCollectionQueryDto queryDto)
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

        var (totalItems, submissionDtos) =
            await _assignmentSubmissionService.GetSubmissionsHistoryAsync(courseId, assignmentId, student.StudentId,
                queryDto);
        return Ok(new PaginationResponseDto<IEnumerable<AssignmentSubmissionMinimalDto>>
            (
                data: submissionDtos,
                totalItems: totalItems,
                page: queryDto.Page,
                size: queryDto.Size)
        );
    }

    [HttpGet]
    [Route("{assignmentId:int}/Submissions/{submissionId:int}")]
    public async Task<IActionResult> GetDetailSubmission([FromRoute] int courseId, [FromRoute] int assignmentId,
        [FromRoute] int submissionId)
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


        var submission =
            await _assignmentSubmissionService.GetDetailSubmissionForStudentAsync(courseId, assignmentId,
                submissionId, student.StudentId);

        return Ok(new ResponseDto<AssignmentSubmissionForStudentDto>(submission));
    }
}