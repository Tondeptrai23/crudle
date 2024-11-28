using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3w1m.Dtos.Article;

public class UpdateArticleProgressDto
{
    public int ArticleId { get; set; }
    public int StudentId { get; set; }

    public DateTime? ReadAt { get; set; }
}