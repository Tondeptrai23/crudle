﻿using System;

namespace _3w1m.Dtos.Article;

public class StudentMinimalArticleDto
{
    public int ArticleId { get; set; }
    public int CourseId { get; set; }
    public string Title { get; set; }
    public string? Summary { get; set; }
    public int Order { get; set; }
    public bool IsRead { get; set; }
    public DateTime? ReadAt { get; set; }
}