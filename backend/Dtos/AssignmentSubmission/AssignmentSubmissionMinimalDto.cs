namespace _3w1m.Dtos.Assignment;

public class AssignmentSubmissionMinimalDto
{
    public int SubmissionId { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime SubmittedAt { get; set; }
    public double? Score { get; set; }
    public int AssignmentId { get; set; }
    public int StudentId { get; set; }
    public string StudentName { get; set; }
}