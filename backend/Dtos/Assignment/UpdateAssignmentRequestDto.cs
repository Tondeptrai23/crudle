﻿using _3w1m.Dtos.Questions;

namespace _3w1m.Dtos.Assignment;

public class UpdateAssignmentRequestDto
{
    public string? Name { get; set; }
    public DateTime? DueDate { get; set; }
    public ICollection<QuestionDto>? Questions { get; set; }
}