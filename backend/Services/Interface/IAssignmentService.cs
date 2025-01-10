using _3w1m.Dtos.Assignment;
using _3w1m.Models.Exceptions;
using _3w1m.Specifications.Interface;

namespace _3w1m.Services.Interface;

public interface IAssignmentService
{
    /// <summary>
    /// Get all assignments for a course
    /// </summary>
    /// <param name="courseId">The unique identify of the course</param>
    /// <param name="specification">The specification for filtering the assignments</param>
    /// <param name="assignmentCollectionQueryDto">The query parameters for filtering, ordering, and pagination</param>
    /// <returns>The task result contains the quantity and a collection of assignment Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    public Task<(int count, IEnumerable<AssignmentDto>)> GetAssignmentsAsync(int courseId,
        IAssignmentSpecification specification,
        AssignmentCollectionQueryDto? assignmentCollectionQueryDto);

    public Task<AssignmentDto> GetAssignmentAsync(int courseId, int assignmentId,
        IAssignmentSpecification? spec = null);

    /// <summary>
    /// Create an assignment
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="createAssignmentRequestDto">The Dto containing the information for create new assignment</param>
    /// <returns>The task result contains the assignment detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    public Task<AssignmentDto> CreateAssignmentAsync(int courseId,
        CreateAssignmentRequestDto createAssignmentRequestDto);

    public Task<AssignmentSubmissionResponseDto> SubmitAssignmentAsync(int courseId, int assignmentId, int studentId,
        AssignmentSubmissionRequestDto assignmentSubmissionRequestDto);

    /// <summary>
    /// Delete an assignment
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <returns>The task result contains the boolean value indicating the success of the operation</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception> 
    public Task<bool> DeleteAssignmentAsync(int courseId, int assignmentId);

    public Task<AssignmentDto> ReplaceAssignmentAsync(int courseId, int assignmentId,
        CreateAssignmentRequestDto updateAssignmentRequestDto);

    /// <summary>
    /// Update an assignment description
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="updateAssignmentRequestDto">The Dto containing the information for update assignment description</param>
    /// <returns>The task result contains the assignment detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    public Task<AssignmentDto> UpdateAssignmentDescriptionAsync(int courseId, int assignmentId,
        UpdateAssignmentRequestDto updateAssignmentRequestDto);

    public Task<AssignmentStartResponseDto> StartAssignmentAsync(int courseId, int assignmentId, int studentId);

    public Task<AssignmentStartResponseDto> ResumeAssignmentAsync(int submissionId);

    Task<(int count, IEnumerable<UpcomingAssignmentDto>)> GetAssignmentsByStudentId(int studentId, int year, int month);

    Task<(int count, IEnumerable<UpcomingAssignmentDto>)> GetAssignmentsByTeacherId(int teacherId, int year, int month);

    Task<IEnumerable<UpcomingAssignmentDto>> GetNotDoneAssignments(int studentId);
}