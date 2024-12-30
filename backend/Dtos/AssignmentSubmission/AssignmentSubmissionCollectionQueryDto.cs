using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3w1m.Dtos.Assignment;

public class AssignmentSubmissionCollectionQueryDto : BaseCollectionQueryDto
{
    public DateTime? StartedAtFrom { get; set; }
    public DateTime? StartedAtTo { get; set; }
    public DateTime? SubmittedAtFrom { get; set; }
    public DateTime? SubmittedAtTo { get; set; }
    public double? Score { get; set; }
}