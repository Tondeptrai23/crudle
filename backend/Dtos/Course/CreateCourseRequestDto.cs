using _3w1m.Models.Domain;

namespace _3w1m.Dtos;

public class CreateCourseRequestDto 
{
    public int CourseId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; } = string.Empty;

    public string Code { get; set; }

    public DateOnly StartDate { get; set; } = DateOnly.MinValue;

    public int? TeacherId { get; set; }
}