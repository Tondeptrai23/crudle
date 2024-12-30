namespace _3w1m.Dtos.Exam;

public class StudentAnswerExamDto
{
    public int StudentAnswerId { get; set; }
    
    public int ExamQuestionId { get; set; }
    
    public int SubmissionId { get; set; }
    
    public string Value { get; set; }
}