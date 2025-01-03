namespace _3w1m.Dtos.Exam.Student;

public class ExamSubmissionDto
{
    public int ExamId { get; set; } 
    public int ExamSubmissionId { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public List<ExamQuestionForStudentDto> Questions { get; set; }
}