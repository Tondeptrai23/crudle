namespace _3w1m.Dtos.Exam.Student;

public class ExamSubmissionDto: ExamSubmissionMinimalDto
{
    public List<ExamQuestionWithAnswer> Questions { get; set; }
}