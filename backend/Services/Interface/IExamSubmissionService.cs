using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;

namespace _3w1m.Services.Interface;

public interface IExamSubmissionService
{
    
    Task<(int , ICollection<ExamSubmissionMinimalDto>)> GetExamSubmissionsAsync(int courseId, int examId, ExamSubmissionQueryCollectionDto queryCollectionDto);
    Task<ExamSubmissionDto> GetDetailExamSubmissionTeacherAsync(int courseId, int examId, int examSubmissionId);
    
    Task<(int , ICollection<ExamSubmissionMinimalDto>)> GetExamSubmissionsHistoryAsync(int courseId, int studentId, ExamSubmissionQueryCollectionDto queryCollectionDto);
    Task<ExamSubmissionDto> GetDetailExamSubmissionStudentAsync(int courseId, int examId, int studentId, int examSubmissionId);
}