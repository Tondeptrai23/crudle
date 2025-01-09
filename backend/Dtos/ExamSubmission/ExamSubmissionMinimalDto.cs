namespace _3w1m.Dtos.Exam.Student;

public class ExamSubmissionMinimalDto
{
    public int ExamId { get; set; } 
    public int SubmissionId { get; set; }
    public string StudentName { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public DateTime ExamDueDate { get; set; }
    public int Score { get; set; }
}