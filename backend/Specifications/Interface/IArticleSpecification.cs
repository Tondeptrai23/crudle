using _3w1m.Models.Domain;

namespace _3w1m.Specifications.Interface;

public interface IArticleSpecification : IBaseSpecification<Article>
{
    IQueryable<Article> Apply(IQueryable<Article> query);
}