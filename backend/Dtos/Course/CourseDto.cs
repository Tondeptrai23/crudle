using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;

namespace _3w1m.Dtos;

public class CourseDto
{
    public int CourseId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
    
    public string Code { get; set; }
    
    public DateOnly StartDate { get; set; }
    
    public int TeacherId { get; set; }

    public TeacherMinimalDto Teacher { get; set; }
}