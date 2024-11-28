namespace _3w1m.Dtos.Article;

public class ArticleCollectionQueryDto: BaseCollectionQueryDto
{
    public string? Title { get; set; }
    public string? Summary { get; set; }
    public string? Content { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}