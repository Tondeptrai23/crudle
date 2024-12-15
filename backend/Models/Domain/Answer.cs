namespace _3w1m.Models.Domain;

public class Answer
{
    public int AnswerId { get; set; }
    public int QuestionId { get; set; }
    public string Value { get; set; }
    public bool IsCorrect { get; set; }
    public Question Question { get; set; }
}
