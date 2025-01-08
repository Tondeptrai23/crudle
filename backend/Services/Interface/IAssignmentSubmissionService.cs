using _3w1m.Dtos.Assignment;

namespace _3w1m.Services.Interface;

public interface IAssignmentSubmissionService
{
    /// <summary>
    /// Get submissions for the teacher
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <returns>The task contain list of submissions</returns>
    Task<(int, IEnumerable<AssignmentSubmissionMinimalDto>)> GetSubmissionsAsync(int courseId, int assignmentId,
        int teacherId, AssignmentSubmissionCollectionQueryDto queryDto);

    /// <summary>
    /// Get detail submission by course, assignment for the teacher
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="submissionId">The unique identifier of the Submission</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <returns>The dto contain details of a submission</returns>
    Task<AssignmentSubmissionDto> GetDetailSubmissionForTeacherAsync(int courseId, int assignmentId, int submissionId,
        int teacherId);

    /// <summary>
    /// Get detail submission by course, assignment for the teacher
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="submissionId">The unique identifier of the Submission</param>
    /// <param name="studentId">The unique identifier of the teacher</param>
    /// <returns>The dto contain details of the detail of a submission</returns>
    Task<AssignmentSubmissionDto> GetDetailSubmissionForStudentAsync(int courseId, int assignmentId,
        int submissionId,
        int studentId);


    /// <summary>
    /// Get submissions history of a specific student
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="assignmentId">The unique identifier of the assignment</param>
    /// <param name="studentId">The unique identifier of the teacher</param>
    /// <returns>The task contain list of submissions</returns>
    Task<(int, IEnumerable<AssignmentSubmissionMinimalDto>)> GetSubmissionsHistoryAsync(int courseId, int assignmentId,
        int studentId, AssignmentSubmissionCollectionQueryDto queryDto);
}