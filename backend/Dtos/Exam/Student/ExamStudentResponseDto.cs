using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Exam.Student;

public class ExamStudentResponseDto
{
    public string Name { get; set; }   
    
    public string Content { get; set; }
    
    public int Duration { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<ExamQuestionForStudentDto> ExamQuestions { get; set; }
}