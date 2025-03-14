﻿namespace _3w1m.Dtos.Assignment;

public class UpdateAssignmentRequestDto
{
    public string? Name { get; set; }
    public string? Content { get; set; }
    public DateTime? DueDate { get; set; }
    public bool? CanViewScore { get; set; }
    public bool? CanRetry { get; set; }
}