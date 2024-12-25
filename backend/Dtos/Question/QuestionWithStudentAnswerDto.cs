using _3w1m.Dtos.Answers;
using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Questions;

public class QuestionWithStudentAnswerDto: QuestionDto
{
    public ICollection<StudentAnswerDto> StudentAnswers { get; set; }
}