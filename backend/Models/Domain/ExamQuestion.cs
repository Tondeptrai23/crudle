namespace _3w1m.Models.Domain;

public class ExamQuestion
{
    public int ExamQuestionId { get; set; }
    public int ExamId { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public Exam Exam { get; set; }
    public ICollection<ExamAnswer> Answers { get; set; }
    public ICollection<StudentAnswerExam> StudentAnswers { get; set; }
}