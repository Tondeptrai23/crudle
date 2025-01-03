using _3w1m.Dtos.Exam.Student;

namespace _3w1m.Dtos.ExamSubmission.Student;

public class ExamStartResponseDto
{
    public int ExamId { get; set; } 
    public int SubmissionId { get; set; }
    public DateTime StartedAt { get; set; }
    public List<ExamQuestionForStudentDto> Questions { get; set; }
}