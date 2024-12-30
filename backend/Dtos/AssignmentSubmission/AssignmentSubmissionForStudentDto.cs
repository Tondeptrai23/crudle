using _3w1m.Dtos.Questions;

namespace _3w1m.Dtos.Assignment;

public class AssignmentSubmissionForStudentDto: AssignmentSubmissionMinimalDto
{
    public ICollection<QuestionWithAnswerForStudentDto> Questions { get; set; }
}