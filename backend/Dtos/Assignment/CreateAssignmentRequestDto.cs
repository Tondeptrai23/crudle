using _3w1m.Dtos.Questions;

namespace _3w1m.Dtos.Assignment;

public class CreateAssignmentRequestDto
{
    public string Name { get; set; }
    public string Content { get; set; }
    public DateTime DueDate { get; set; }
    public ICollection<CreateQuestionRequestDto>? Questions { get; set; }
}