using _3w1m.Dtos.Teacher;

namespace _3w1m.Dtos.Course;

public class CourseMinimalDto
{
    public int CourseId { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public TeacherMinimalDto Teacher { get; set; }
}