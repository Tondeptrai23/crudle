using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Exam.Student;

public class ExamQuestionWithAnswer: ExamQuestionDto
{
    public ICollection<ExamStudentAnswerDto> Answers { get; set; }
}