using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Exam.Student;

public class ExamQuestionForStudentDto
{
    public int ExamQuestionId { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public ICollection<ExamAnswerForStudentDto> Answers { get; set; }
}