using _3w1m.Models.Domain;

namespace _3w1m.Specifications.Interface;

public interface IArticleSpecification
{
    IQueryable<Article> Apply(IQueryable<Article> query);
}