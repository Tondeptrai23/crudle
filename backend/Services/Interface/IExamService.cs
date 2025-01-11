using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.Exam.Teacher;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;
using _3w1m.Models.Exceptions;

namespace _3w1m.Services.Interface;

public interface IExamService
{
    /// <summary>
    /// Get exams by courseId
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <param name="queryDto">The query parameters for filtering, ordering, and pagination</param>
    /// <returns>The task result contains the quantity and a collection of exam Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<(int, IEnumerable<ExamMinimalDto>)>
        GetExamsAsync(int courseId, int teacherId, ExamQueryCollectionDto queryDto);

    /// <summary>
    /// Get exam by examId and courseId
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <returns>The task result contains the exam detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ExamDto> GetDetailExamForTeacherAsync(int courseId, int examId, int teacherId);
    
    /// <summary>
    /// Get exam by examId and courseId
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="studentId">The unique identifier of the student</param>
    /// <returns>The task result contains the exam detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ExamStudentResponseDto> GetDetailExamForStudentAsync(int courseId, int examId, int studentId);
    
    /// <summary>
    /// Create an exam
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <param name="createExamRequestDto">The Dto containing the information for create new exam</param>
    /// <returns>The task result contains the exam detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ExamDto> CreateExamAsync(int courseId, int teacherId, CreateExamRequestDto createExamRequestDto);
    
    /// <summary>
    /// Replace an exam
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="updateExamRequestDto">The Dto containing the information for replace exam</param>
    /// <returns>The task result contains the exam detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ExamDto> ReplaceExamAsync(int courseId, int teacherId, int examId, CreateExamRequestDto updateExamRequestDto);

    /// <summary>
    /// Update an exam
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="updateMinimalExamRequestDto">The Dto containing the information for update exam</param>
    /// <returns>The task result contains the exam detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<ExamMinimalDto> UpdatePartiallyExamAsync(int courseId, int teacherId, int examId,
        UpdateMinimalExamRequestDto updateMinimalExamRequestDto);

    /// <summary>
    /// Delete an exam
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <returns>The task result contains the response when exam deleted</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<bool> DeleteExamAsync(int courseId, int examId, int teacherId);
    
    /// <summary>
    /// Start an exam
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="studentId">The unique identifier of the student</param>
    /// <returns>The task result contains the response when exam started</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the exam is ended</exception>
    Task<ExamStartResponseDto> StartExamAsync(int courseId, int examId, int studentId);

    /// <summary>
    /// Submit an exam
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="studentId">The unique identifier of the student</param>
    /// <param name="examSubmissionRequestDto">The Dto containing the information for submit exam</param>
    /// <returns>The task result contains the response when exam submitted</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    /// <exception cref="ForbiddenException">Thrown if the exam is not started</exception>
    Task<ExamSubmissionResponseDto> SubmitExamAsync(int courseId, int examId, int studentId,
        ExamSubmissionRequestDto examSubmissionRequestDto);

    /// <summary>
    /// Get exam submission by examId and courseId
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="examId">The unique identifier of the exam</param>
    /// <param name="teacherId">The unique identifier of the teacher</param>
    /// <returns>The task result contains the exam submission detail Dto</returns>
    /// <exception cref="ResourceNotFoundException">Thrown if the course is not found</exception>
    Task<(int count, IEnumerable<UpcomingExamDto>)> GetExamsByStudentId(int studentId, int year, int month);
    Task<(int count, IEnumerable<UpcomingExamDto>)> GetExamsByTeacherId(int teacherId, int year, int month);
}