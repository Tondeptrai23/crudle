namespace _3w1m.Models.Domain;

public class  ArticleProgress
{
    public int ArticleProgressId { get; set; }
    public int ArticleId { get; set; }
    public int StudentId { get; set; }

    public DateTime? ReadAt { get; set; }

    public Article Article { get; set; }
    public Student Student { get; set; }
}