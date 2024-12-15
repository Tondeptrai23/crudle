namespace _3w1m.Models.Domain;

public class StudentAnswer
{
    public int? StudentAnswerId { get; set; }
    
    public int QuestionId { get; set; }
    
    public int SubmissionId { get; set; }
    
    public string Value { get; set; }
    
    public virtual Question Question { get; set; }
    
    public virtual AssignmentSubmission Submission { get; set; }
}