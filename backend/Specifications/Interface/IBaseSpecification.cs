namespace _3w1m.Specifications.Interface;

public interface IBaseSpecification<T> where T : class
{
    IQueryable<T> Apply(IQueryable<T> query);
}