namespace _3w1m.Models.Domain;

public class Course
{
    public int CourseId { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Code { get; set; }
    
    public DateOnly StartDate { get; set; }
    
    public int? TeacherId { get; set; }
    
    public Teacher? Teacher { get; set; }
    
    public ICollection<Enrollment> Enrollments { get; set; }
    
    public ICollection<Assignment> Assignments { get; set; }
    
    public ICollection<Article> Articles { get; set; }
    
    public ICollection<Exam> Exams { get; set; }
}