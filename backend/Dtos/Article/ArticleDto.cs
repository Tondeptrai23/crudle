namespace _3w1m.Dtos.Article;

public class ArticleDto
{
    public int ArticleId { get; set; }
    public int CourseId { get; set; }
    public string Title { get; set; }
    public string? Summary { get; set; }
    public string Content { get; set; }
    public int Order { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? ReadAt { get; set; }
}