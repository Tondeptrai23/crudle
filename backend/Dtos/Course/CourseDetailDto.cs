using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;

namespace _3w1m.Dtos.Course;

public class CourseDetailDto : CourseDto
{
    public IEnumerable<StudentDto> Students { get; set; }
}