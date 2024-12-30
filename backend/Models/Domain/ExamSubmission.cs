namespace _3w1m.Models.Domain;

public class ExamSubmission
{
    public int SubmissionId { get; set; }
    
    public DateTime StartedAt { get; set; }
    public DateTime SubmittedAt { get; set; }
    
    public int? Score { get; set; }
    
    public int ExamId { get; set; }

    public int StudentId { get; set; }

    public virtual Student Student { get; set; }
    
    public virtual Exam Exam { get; set; }
    
    public virtual ICollection<StudentAnswerExam> StudentAnswers { get; set; }
}