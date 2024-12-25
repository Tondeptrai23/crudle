namespace _3w1m.Dtos.Questions;

public class CreateMultipleQuestionRequestDto
{
    public ICollection<CreateQuestionRequestDto> Questions { get; set; }
}