namespace _3w1m.Models.Domain;

public class AssignmentSubmission
{
    public int? SubmissionId { get; set; }
    
    
    public DateTime SubmittedAt { get; set; }
    
    public double Score { get; set; }
    
    public int AssignmentId { get; set; }

    public int StudentId { get; set; }

    public virtual Assignment Assignment { get; set; }
    
    public virtual Student Student { get; set; }
    
    public virtual ICollection<StudentAnswer> Answers { get; set; }
}