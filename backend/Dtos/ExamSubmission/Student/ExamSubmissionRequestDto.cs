namespace _3w1m.Dtos.Exam.Student;

public class ExamSubmissionRequestDto
{
    public int ExamSubmissionId { get; set; }
    
    public ICollection<ExamStudentAnswerRequestDto> StudentAnswers { get; set; }
}