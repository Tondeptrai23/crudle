namespace _3w1m.Dtos.Assignment;

public class AssignmentSubmissionResponseDto
{
    public int SubmissionId { get; set; }
    
    public string Name { get; set; }
    public int? Score { get; set; }
    
    public DateTime SubmittedAt { get; set; }
}