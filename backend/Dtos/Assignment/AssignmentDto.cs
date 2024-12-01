using _3w1m.Dtos.Questions;

namespace _3w1m.Dtos.Assignment;

public class AssignmentDto
{
    public int AssignmentId { get; set; }
    public int CourseId { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<QuestionDto> Questions { get; set; }
}