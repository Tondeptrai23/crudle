using _3w1m.Dtos.Exam.Student;

namespace _3w1m.Dtos.ExamSubmission.Student;

public class ExamSubmissionForStudentDto: ExamSubmissionMinimalDto
{
    public ICollection<ExamQuestionWithAnswerForStudentDto> Questions { get; set; }
}