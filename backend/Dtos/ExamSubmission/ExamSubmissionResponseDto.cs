using _3w1m.Dtos.Exam.Student;

namespace _3w1m.Dtos.ExamSubmission;

public class ExamSubmissionResponseDto
{
    public int SubmissionId { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public int Score { get; set; }
    public string StudentName { get; set; }
}