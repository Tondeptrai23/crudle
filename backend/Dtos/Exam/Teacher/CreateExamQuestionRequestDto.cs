namespace _3w1m.Dtos.Exam.Student;

public class CreateExamQuestionRequestDto
{
    public int ExamId { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public ICollection<CreateExamAnswerRequestDto> Answers { get; set; }
}