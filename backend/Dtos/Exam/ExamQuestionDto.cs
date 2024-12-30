using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Exam;

public class ExamQuestionDto
{
    public int ExamQuestionId { get; set; }
    public int ExamId { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public ICollection<ExamAnswerDto> ExamAnswers { get; set; }
}