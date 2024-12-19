using _3w1m.Dtos.Answers;

namespace _3w1m.Dtos.Questions;

public class CreateQuestionRequestDto
{
    public string Content { get; set; }
    public string Type { get; set; }
    public ICollection<CreateAnswerRequestDto> Answers { get; set; }
}