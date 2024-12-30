﻿
namespace _3w1m.Dtos.Exam.Student;

public class CreateExamRequestDto
{
    public string Name { get; set; }   
    
    public string Content { get; set; }
    
    public int Duration { get; set; }
    
    public int MaxScore { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public ICollection<ExamQuestionDto> Questions { get; set; }
}