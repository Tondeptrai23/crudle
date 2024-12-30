using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _3w1m.Dtos.Answers;
using _3w1m.Dtos.Questions;
using _3w1m.Models.Domain;

namespace _3w1m.Dtos.Assignment;

public class AssignmentSubmissionDto: AssignmentSubmissionMinimalDto
{
    public virtual ICollection<QuestionWithStudentAnswerDto> QuestionWithStudentAnswer { get; set; }
}