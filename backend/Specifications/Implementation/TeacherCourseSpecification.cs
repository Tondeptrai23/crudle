using _3w1m.Models.Domain;
using _3w1m.Specifications.Interface;

namespace _3w1m.Specifications;

public class TeacherCourseSpecification: ICourseSpecification
{
    private readonly int _teacherId;

    public TeacherCourseSpecification(int teacherId)
    {
        _teacherId = teacherId;
    }

    public IQueryable<Course> Apply(IQueryable<Course> query)
    {
        return query.Where(c => c.TeacherId == _teacherId);
    }
}