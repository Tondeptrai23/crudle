namespace _3w1m.Dtos.Teacher;

public class CreateTeacherRequestDto
{
    public int TeacherId { get; set; }

    public string Fullname { get; set; }

    public string ContactEmail { get; set; }

    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public string ContactPhone { get; set; }
}