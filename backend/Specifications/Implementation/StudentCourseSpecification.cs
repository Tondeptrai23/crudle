using _3w1m.Models.Domain;
using _3w1m.Specifications.Interface;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Specifications;

public class StudentCourseSpecification : ICourseSpecification
{
    private readonly int _studentId;

    public StudentCourseSpecification(int studentId)
    {
        _studentId = studentId;
    }

    public IQueryable<Course> Apply(IQueryable<Course> query)
    {
        return query
            .Include(c => c.Enrollments)
                .ThenInclude(e => e.Student)
            .Include(c => c.Teacher)
            .Where(c => c.Enrollments.Any(e => e.StudentId == _studentId));
    }
}