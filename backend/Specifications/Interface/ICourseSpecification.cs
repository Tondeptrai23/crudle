using _3w1m.Models.Domain;

namespace _3w1m.Specifications.Interface;

public interface ICourseSpecification: IBaseSpecification<Course>
{
    IQueryable<Course> Apply(IQueryable<Course> query);
}