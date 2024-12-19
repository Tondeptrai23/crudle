using _3w1m.Dtos.Answers;

namespace _3w1m.Dtos.Questions;

public class QuestionForStudentDto
{
    public int QuestionId { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public ICollection<AnswerForStudentDto> Answers { get; set; }
}