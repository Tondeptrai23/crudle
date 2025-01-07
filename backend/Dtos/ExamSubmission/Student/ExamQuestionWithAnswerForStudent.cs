using _3w1m.Dtos.Exam.Student;

namespace _3w1m.Dtos.ExamSubmission.Student;

public class ExamQuestionWithAnswerForStudent : ExamQuestionForStudentDto
{
    public ICollection<ExamStudentAnswerDto> Answers { get; set; }
}