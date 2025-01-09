namespace _3w1m.Dtos.Exam;

public class ExamAnswerDto
{
    public int AnswerId { get; set; }
    public int ExamQuestionId { get; set; }
    public string Value { get; set; }
    public bool IsCorrect { get; set; }
}