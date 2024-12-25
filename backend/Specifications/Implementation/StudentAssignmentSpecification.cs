using _3w1m.Models.Domain;
using _3w1m.Specifications.Interface;

namespace _3w1m.Specifications;

public class StudentAssignmentSpecification : IAssignmentSpecification
{
    public IQueryable<Assignment> Apply(IQueryable<Assignment> query)
    {
        return query;
    }
}