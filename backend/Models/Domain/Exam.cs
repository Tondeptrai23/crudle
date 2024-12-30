using Microsoft.AspNetCore.Authentication.Cookies;

namespace _3w1m.Models.Domain;

public class Exam
{
    public int ExamId { get; set; }
    
    public int CourseId { get; set; }
    
    public string Name { get; set; }   
    
    public string Content { get; set; }
    
    public int Duration { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public Course Course { get; set; }

    public ICollection<ExamQuestion> ExamQuestions { get; set; }
    
    public ICollection<ExamSubmission> Submissions { get; set; }
}