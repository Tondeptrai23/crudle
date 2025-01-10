namespace _3w1m.Models.Domain;

public class ExamAnswer
{
    public int AnswerId { get; set; }
    public int ExamQuestionId { get; set; }
    public string Value { get; set; }
    public bool IsCorrect { get; set; }
    public ExamQuestion Question { get; set; }
}