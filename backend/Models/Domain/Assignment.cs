namespace _3w1m.Models.Domain;

public class Assignment
{
    public int AssignmentId { get; set; }
    public int CourseId { get; set; }
    public string Name { get; set; }    
    public string Content { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<Question> Questions { get; set; }
    public Course Course { get; set; }
}