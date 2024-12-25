using _3w1m.Dtos.Answers;
using _3w1m.Dtos.Questions;

namespace _3w1m.Dtos.Assignment;

public class AssignmentSubmissionRequestDto
{
    public int SubmissionId { get; set; }
    public ICollection<AnswerSubmitRequestDto> Answers { get; set; }
}