using _3w1m.Dtos;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.Exam.Teacher;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;

namespace _3w1m.Services.Interface;

public interface IExamService
{
    Task<(int, IEnumerable<ExamMinimalDto>)>
        GetExamsAsync(int courseId, int teacherId, ExamQueryCollectionDto queryDto);

    Task<ExamDto> GetDetailExamForTeacherAsync(int courseId, int examId, int teacherId);
    Task<ExamStudentResponseDto> GetDetailExamForStudentAsync(int courseId, int examId, int studentId);
    Task<ExamDto> CreateExamAsync(int courseId, int teacherId, CreateExamRequestDto createExamRequestDto);
    Task<ExamDto> UpdateExamAsync(int courseId, int teacherId, int examId, UpdateExamRequestDto updateExamRequestDto);

    Task<ExamMinimalDto> UpdatePartiallyExamAsync(int courseId, int teacherI, int examId,
        UpdateMinimalExamRequestDto updateMinimalExamRequestDto);

    Task<bool> DeleteExamAsync(int courseId, int examId, int teacherId);
    
    Task<ExamStartResponseDto> StartExamAsync(int courseId, int examId, int studentId);
    Task<ExamSubmissionResponseDto> SubmitExamAsync(int courseId, int examId, int studentId, ExamSubmissionRequestDto examSubmissionRequestDto);
    
}