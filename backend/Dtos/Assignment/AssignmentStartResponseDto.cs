using _3w1m.Dtos.Questions;

namespace _3w1m.Dtos.Assignment;

public class AssignmentStartResponseDto
{
    public int SubmissionId { get; set; }
    public int AssignmentId { get; set; }
    public DateTime StartedAt { get; set; }
    public IEnumerable<QuestionForStudentDto> Questions { get; set; }
}