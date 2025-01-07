using _3w1m.Dtos.Exam.Student;

namespace _3w1m.Dtos.ExamSubmission.Student;

public class ExamSubmissionForStudentDto: ExamSubmissionMinimalDto
{
    public ICollection<ExamQuestionWithAnswerForStudent> ExamQuestions { get; set; }
}