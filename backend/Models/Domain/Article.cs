namespace _3w1m.Models.Domain;

public class Article
{
    public int ArticleId { get; set; } 
    public int CourseId { get; set; }
    public string Title { get; set; }
    public string? Summary { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public Course Course { get; set; }
}