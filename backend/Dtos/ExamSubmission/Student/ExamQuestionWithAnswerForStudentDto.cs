using _3w1m.Dtos.Exam.Student;

namespace _3w1m.Dtos.ExamSubmission.Student;

public class ExamQuestionWithAnswerForStudentDto : ExamQuestionForStudentDto
{
    public ICollection<ExamStudentAnswerDto> StudentAnswer { get; set; }
}