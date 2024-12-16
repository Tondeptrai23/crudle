using _3w1m.Dtos.Answers;
using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Questions;

public class QuestionDto
{
    public int QuestionId { get; set; }
    public int AssignmentId { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public ICollection<AnswerDto> Answers { get; set; }
}