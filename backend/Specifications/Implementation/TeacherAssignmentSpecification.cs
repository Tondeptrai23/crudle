using _3w1m.Models.Domain;
using _3w1m.Specifications.Interface;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Specifications;

public class TeacherAssignmentSpecification : IAssignmentSpecification
{
    public IQueryable<Assignment> Apply(IQueryable<Assignment> query)
    {
        return query.Include(a => a.Questions)
            .ThenInclude(a => a.Answers);
    }
}