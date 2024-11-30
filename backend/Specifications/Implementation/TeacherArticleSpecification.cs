using _3w1m.Models.Domain;
using _3w1m.Specifications.Interface;

namespace _3w1m.Specifications;

public class TeacherArticleSpecification : IArticleSpecification
{
    public IQueryable<Article> Apply(IQueryable<Article> query)
    {
        return query;
    }
}