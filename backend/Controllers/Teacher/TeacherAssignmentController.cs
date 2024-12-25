using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Assignment;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Teacher;

[ApiController]
[Authorize(Roles = CourseRoles.Teacher)]
[Route("api/Teacher/Course/{courseId:int}/[controller]")]
[Tags("Teacher Assignment")]
public class AssignmentController : Controller
{
    private readonly IAssignmentService _assignmentService;
    private readonly IAssignmentSubmissionService _assignmentSubmissionService;
    private readonly UserManager<User> _userManager;
    private readonly ITeacherService _teacherService;
    private readonly ICourseService _courseService;

    public AssignmentController(IAssignmentService assignmentService, UserManager<User> userManager,
        ITeacherService teacherService, ICourseService courseService,
        IAssignmentSubmissionService assignmentSubmissionService)
    {
        _teacherService = teacherService;
        _userManager = userManager;
        _assignmentService = assignmentService;
        _courseService = courseService;
        _assignmentSubmissionService = assignmentSubmissionService;
    }

    [HttpDelete]
    [Route("{assignmentId:int}")]
    public async Task<IActionResult> DeleteAssignment([FromRoute] int courseId, [FromRoute] int assignmentId)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }

        var result = await _assignmentService.DeleteAssignmentAsync(courseId, assignmentId);
        return Ok(new GeneralDeleteResponseDto { Success = result });
    }

    [HttpPut]
    [Route("{assignmentId:int}")]
    public async Task<IActionResult> UpdateAssignment([FromRoute] int courseId, [FromRoute] int assignmentId,
        [FromBody] CreateAssignmentRequestDto updateAssignmentRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }

        var assignment =
            await _assignmentService.ReplaceAssignmentAsync(courseId, assignmentId, updateAssignmentRequestDto);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }

    [HttpPatch]
    [Route("{assignmentId:int}")]
    public async Task<IActionResult> UpdateAssignmentDescription([FromRoute] int courseId, int assignmentId,
        [FromBody] UpdateAssignmentRequestDto updateAssignmentRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not enrolled in the course");
        }

        var assignment = await _assignmentService.UpdateAssignmentDescriptionAsync(courseId,
            assignmentId, updateAssignmentRequestDto);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }


    [HttpPost]
    public async Task<IActionResult> CreateAssignment([FromRoute] int courseId,
        [FromBody] CreateAssignmentRequestDto createAssignmentRequestDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }

        var assignment = await _assignmentService.CreateAssignmentAsync(courseId, createAssignmentRequestDto);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }


    [HttpGet]
    public async Task<IActionResult> GetAssignments([FromRoute] int courseId,
        [FromQuery] AssignmentCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }

        var specification = new TeacherAssignmentSpecification();

        var (count, assignments) = await _assignmentService.GetAssignmentsAsync(courseId, specification, queryDto);
        return Ok(new PaginationResponseDto<IEnumerable<AssignmentDto>>(assignments, count, queryDto.Page,
            queryDto.Size));
    }

    [HttpGet]
    [Route("{assignmentId:int}")]
    public async Task<IActionResult> GetAssignment([FromRoute] int courseId, [FromRoute] int assignmentId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }

        var specification = new TeacherAssignmentSpecification();

        var assignment = await _assignmentService.GetAssignmentAsync(courseId, assignmentId, specification);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }

    [HttpGet]
    [Route("{assignmentId:int}/Submissions")]
    public async Task<IActionResult> GetSubmissions([FromRoute] int courseId, [FromRoute] int assignmentId,
        [FromQuery] AssignmentSubmissionCollectionQueryDto queryDto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }


        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var (totalItems, submissions) =
            await _assignmentSubmissionService.GetSubmissionsAsync(courseId, assignmentId, teacher.TeacherId, queryDto);

        return Ok(new PaginationResponseDto<IEnumerable<AssignmentSubmissionMinimalDto>>(submissions, totalItems,
            queryDto.Page,
            queryDto.Size));
    }

    [HttpGet]
    [Route("{assignmentId:int}/Submissions/{submissionId:int}")]
    public async Task<IActionResult> GetSubmission([FromRoute] int courseId, [FromRoute] int assignmentId,
        [FromRoute] int submissionId)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized();
        }

        if (!await _courseService.CourseEnrolledUserValidationAsync(courseId, user.Id))
        {
            throw new ForbiddenException("This teacher is not allowed to create assignment for this course");
        }

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);
        var submission =
            await _assignmentSubmissionService.GetDetailSubmissionForTeacherAsync(courseId, assignmentId, submissionId,
                teacher.TeacherId);

        return Ok(new ResponseDto<AssignmentSubmissionDto>(submission));
    }
}