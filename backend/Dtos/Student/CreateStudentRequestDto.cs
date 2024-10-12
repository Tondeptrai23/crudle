namespace _3w1m.Dtos.Student;

public class CreateStudentRequestDto
{
    public int StudentId { get; set; }
    
    public string Fullname { get; set; }

    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public DateOnly DateOfBirth { get; set; }
}