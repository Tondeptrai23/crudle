namespace _3w1m.Models.Domain;

public class Teacher  
{
    public int TeacherId { get; set; }
    
    public string Fullname { get; set; }
    
    public string ContactEmail { get; set; }
    
    public string ContactPhone { get; set; }
    
    public string? UserId { get; set; }

    public User User { get; set; }
}