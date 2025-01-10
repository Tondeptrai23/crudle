using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;
using _3w1m.Models.Exceptions;

namespace _3w1m.Services.Interface;

public interface IExamSubmissionService
{
    /// <summary>
    /// Get exam submissions
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="queryCollectionDto">The query parameters for filtering, ordering, and pagination</param>
    /// <returns>The task contain list of submissions</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or exam is not found</exception>
    Task<(int , ICollection<ExamSubmissionMinimalDto>)> GetExamSubmissionsAsync(int courseId, int examId, ExamSubmissionQueryCollectionDto queryCollectionDto);
    
    /// <summary>
    /// Get detail exam submission for the teacher
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="examSubmissionId">The unique identifier of the exam submission</param>
    /// <returns>The dto contain details of a submission</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or exam is not found</exception>
    Task<ExamSubmissionDto> GetDetailExamSubmissionTeacherAsync(int courseId, int examId, int examSubmissionId);
    
    /// <summary>
    /// Get exam submissions history of a specific student
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="studentId">The unique identifier of the student</param>
    /// <param name="queryCollectionDto">The query parameters for filtering, ordering, and pagination</param>
    /// <returns>The task contain list of submissions</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or student is not found</exception>
    Task<(int , ICollection<ExamSubmissionMinimalDto>)> GetExamSubmissionsHistoryAsync(int courseId, int studentId, ExamSubmissionQueryCollectionDto queryCollectionDto);
    
    /// <summary>
    /// Get detail exam submission for the student
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="studentId">The unique identifier of the student</param>
    /// <param name="examSubmissionId">The unique identifier of the exam submission</param>
    /// <returns>The dto contain details of the detail of a submission</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course or exam is not found</exception>
    Task<ExamSubmissionDto> GetDetailExamSubmissionStudentAsync(int courseId, int examId, int studentId, int examSubmissionId);
}