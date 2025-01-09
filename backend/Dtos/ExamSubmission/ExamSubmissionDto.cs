namespace _3w1m.Dtos.Exam.Student;

public class ExamSubmissionDto: ExamSubmissionMinimalDto
{
    public List<ExamQuestionWithAnswerDto> Questions { get; set; }
}