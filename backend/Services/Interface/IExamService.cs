using _3w1m.Dtos;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;

namespace _3w1m.Services.Interface;

public interface IExamService
{
    Task<(int, IEnumerable<ExamMinimalDto>)>
        GetExamsAsync(int courseId, int teacherId, ExamQueryCollectionDto queryDto);

    Task<ExamDto> GetDetailExamForTeacherAsync(int courseId, int examId, int teacherId);
    Task<ExamDto> GetDetailExamForStudentAsync(int courseId, int examId, int studentId);
    Task<ExamDto> CreateExamAsync(int courseId, int teacherId, int examId, CreateExamRequestDto createExamRequestDto);
    Task<ExamDto> UpdateExamAsync(int courseId, int teacherId, int examId, UpdateExamRequestDto updateExamRequestDto);

    Task<ExamMinimalDto> UpdatePartiallyExamAsync(int courseId, int teacherI, int examId,
        UpdateMinimalExamRequestDto updateMinimalExamRequestDto);

    Task<GeneralDeleteResponseDto> DeleteExamAsync(int courseId, int examId, int teacherId);
}