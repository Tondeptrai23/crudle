namespace _3w1m.Dtos.Exam;

public class ExamMinimalDto
{
    public int ExamId { get; set; }
    public int CourseId { get; set; }
    public string Name { get; set; }   
    
    public string Content { get; set; }
    
    public int Duration { get; set; }
    public int MaxScore { get; set; }

    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
}