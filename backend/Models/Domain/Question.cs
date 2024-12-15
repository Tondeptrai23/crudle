namespace _3w1m.Models.Domain;

public class Question
{
    public int QuestionId { get; set; }
    public int AssignmentId { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    
    public Assignment Assignment { get; set; }
    public ICollection<Answer> Answers { get; set; }
    
    public ICollection<StudentAnswer> StudentAnswers { get; set; }
}