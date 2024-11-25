using _3w1m.Models.Domain;
using _3w1m.Specifications.Interface;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Specifications;

public class StudentArticleSpecification(int studentId) : IArticleSpecification
{
    public IQueryable<Article> Apply(IQueryable<Article> query)
    {
        return query.Include(ar => ar.ArticleProgresses.Where(ap => ap.StudentId == studentId));
    }
}