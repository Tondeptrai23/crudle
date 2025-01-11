using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Exam;

public class ExamDto : ExamMinimalDto
{
    public ICollection<ExamQuestionDto> Questions { get; set; }
    public int NumberOfSubmissions { get; set; }
}