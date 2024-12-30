using _3w1m.Dtos.Answers;

namespace _3w1m.Dtos.Questions;

public class QuestionWithAnswerForStudentDto: QuestionForStudentDto
{
    public ICollection<StudentAnswerDto> StudentAnswers { get; set; }
}