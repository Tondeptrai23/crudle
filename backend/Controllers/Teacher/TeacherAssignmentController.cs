using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Assignment;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Teacher;

[ApiController]
[Authorize(Roles = CourseRoles.Teacher)]
[Route("api/Teacher/[controller]")]
[Tags("Teacher Assignment")]
public class AssignmentController : Controller
{
    private readonly IAssignmentService _assignmentService;

    public UserManager<User> _userManager { get; }
    private readonly ITeacherService _teacherService;
    private readonly ICourseService _courseService;

    public AssignmentController(IAssignmentService assignmentService, UserManager<User> userManager,
        ITeacherService teacherService, ICourseService courseService)
    {
        _teacherService = teacherService;
        _userManager = userManager;
        _assignmentService = assignmentService;
        _courseService = courseService;
    }

    [HttpDelete]
    [Route("{courseId:int}/Assignments/{assignmentId:int}")]
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

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);

        var result = await _assignmentService.DeleteAssignmentAsync(courseId, assignmentId);
        return Ok(new GeneralDeleteResponseDto { Success = result });
    }

    [HttpPut]
    [Route("{courseId:int}/Assignments/{assignmentId:int}")]
    public async Task<IActionResult> UpdateAssignment([FromRoute] int courseId, [FromRoute] int assignmentId,
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

        var assignment =
            await _assignmentService.UpdateAssignmentAsync(courseId, assignmentId, updateAssignmentRequestDto);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }

    [HttpPatch]
    [Route("{courseId:int}/Assignments/{assignmentId:int}")]
    public async Task<IActionResult> UpdateAssignmentDescription([FromRoute] int courseId, int assignmentId,
        [FromBody] UpdateAssignmentDescriptionRequestDto updateAssignmentDescriptionRequestDto)
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

        var teacher = await _teacherService.GetTeacherByUserIdAsync(user.Id);

        var assignment = await _assignmentService.UpdateAssignmentDescriptionAsync(courseId,
            assignmentId, updateAssignmentDescriptionRequestDto);
        return Ok(new ResponseDto<AssignmentDto>(assignment));
    }
}