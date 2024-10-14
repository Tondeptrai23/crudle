namespace _3w1m.Dtos.Student;

public class GetStudentsQueryDto
{
    public int Page { get; set; } = 1;

    public int Size { get; set; } = 5;

    public int? StudentId { get; set; } = null;

    public string? Fullname { get; set; } = null;
     
    public DateOnly? DateOfBirth { get; set; } = null;

    public string? OrderBy { get; set; }

    public string? OrderDirection { get; set; } = "asc";
}