namespace _3w1m.Dtos.Exam.Teacher;

public class UpdateMinimalExamRequestDto
{
    public string Name { get; set; }   
    
    public string Content { get; set; }
    
    public int Duration { get; set; }
    
    public DateTime StartDate { get; set; }
}