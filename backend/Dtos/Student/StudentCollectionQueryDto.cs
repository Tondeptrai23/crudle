namespace _3w1m.Dtos.Student;

public class StudentCollectionQueryDto : BaseCollectionQueryDto
{
    public string? StudentId { get; set; } = null;

    public string? Fullname { get; set; } = null;
     
     
    public DateOnly? DateOfBirthFrom { get; set; } = null;
    
    public DateOnly? DateOfBirthTo { get; set; } = null;
}