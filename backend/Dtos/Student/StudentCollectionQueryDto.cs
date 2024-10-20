namespace _3w1m.Dtos.Student;

public class StudentCollectionQueryDto : BaseCollectionQueryDto
{
    public int? StudentId { get; set; } = null;

    public string? Fullname { get; set; } = null;
     
    public DateOnly? DateOfBirth { get; set; } = null;
}