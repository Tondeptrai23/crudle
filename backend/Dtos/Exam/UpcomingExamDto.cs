namespace _3w1m.Dtos.Exam;

public class UpcomingExamDto
{
    public int ExamId { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public int Duration { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string CourseId { get; set; }
    public string CourseName { get; set; }
}