using _3w1m.Models.Domain;

namespace _3w1m.Specifications.Interface;

public interface IAssignmentSpecification : IBaseSpecification<Assignment>
{
    IQueryable<Assignment> Apply(IQueryable<Assignment> query);
}