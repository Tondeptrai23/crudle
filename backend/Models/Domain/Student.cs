namespace _3w1m.Models.Domain;

public class Student
{
    public int StudentId { get; set; }
    
    public string Fullname { get; set; }
    
    public DateOnly DateOfBirth { get; set; }
    
    public string? UserId { get; set; }
    
    public User User { get; set; }
    
    public ICollection<Enrollment> Enrollments { get; set; }
    public ICollection<ArticleProgress> ArticleProgresses { get; set; }
    
    public ICollection<AssignmentSubmission> Submissions { get; set; }
}