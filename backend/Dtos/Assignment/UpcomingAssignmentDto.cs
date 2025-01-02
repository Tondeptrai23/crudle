namespace _3w1m.Dtos.Assignment;

public class UpcomingAssignmentDto
{
    public int AssignmentId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public string CourseId { get; set; }
    public string CourseName { get; set; }
}