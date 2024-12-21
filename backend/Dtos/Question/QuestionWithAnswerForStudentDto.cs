using _3w1m.Dtos.Answers;

namespace _3w1m.Dtos.Questions;

public class QuestionWithAnswerForStudentDto: QuestionWithStudentAnswerDto
{
    public ICollection<StudentAnswerDto> StudentAnswers { get; set; }
}