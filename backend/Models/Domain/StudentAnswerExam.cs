namespace _3w1m.Models.Domain;

public class StudentAnswerExam
{
    public int StudentAnswerId { get; set; }
    
    public int ExamQuestionId { get; set; }
    
    public int SubmissionId { get; set; }
    
    public string Value { get; set; }
    
    public ExamQuestion ExamQuestion { get; set; }
    
    public virtual ExamSubmission ExamSubmission { get; set; }
}