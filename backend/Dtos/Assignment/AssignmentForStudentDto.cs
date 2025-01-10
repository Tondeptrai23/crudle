namespace _3w1m.Dtos.Assignment;

public class AssignmentForStudentDto
{
    public int AssignmentId { get; set; }
    public int CourseId { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public int TotalQuestions {get; set;}
    public bool CanViewScore { get; set; }
    public bool CanRetry { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}