namespace _3w1m.Dtos.Teacher;
public class TeacherCollectionQueryDto: BaseCollectionQueryDto
{
    
    public string? TeacherId { get; set; } = null;

    public string? Fullname { get; set; } = null;

    public string[]? ContactEmail { get; set; }
    
    public string? ContactPhone { get; set; }
}