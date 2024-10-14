namespace _3w1m.Dtos.Student;

public class StudentDto
{
    public int StudentId { get; set; }
    
    public string Fullname { get; set; }
    
    public DateOnly DateOfBirth { get; set; }
    
    public string? UserId { get; set; }
}