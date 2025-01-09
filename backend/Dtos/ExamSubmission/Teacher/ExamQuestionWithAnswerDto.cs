using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Exam.Student;

public class ExamQuestionWithAnswerDto: ExamQuestionDto
{
    public ICollection<ExamStudentAnswerDto> StudentAnswer { get; set; }
}