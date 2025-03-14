﻿
namespace _3w1m.Dtos.Exam.Student;

public class CreateExamRequestDto
{
    public int ExamId { get; set; }
    
    public string Name { get; set; }   
    
    public string Content { get; set; }
    
    public int Duration { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public ICollection<CreateExamQuestionRequestDto> Questions { get; set; }
}