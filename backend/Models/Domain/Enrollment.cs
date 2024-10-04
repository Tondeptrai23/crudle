namespace _3w1m.Models.Domain;

public class Enrollment
{
    public int EnrollmentId { get; set; }
    
    public int CourseId { get; set; }
    
    public int StudentId { get; set; }
    
    public DateOnly EnrolledAt { get; set; }
    
    public Course Course { get; set; }
    
    public Student Student { get; set; }
    
}