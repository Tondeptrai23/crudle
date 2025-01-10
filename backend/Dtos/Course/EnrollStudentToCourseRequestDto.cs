using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3w1m.Dtos.Course;

public class EnrollmentRequestDto
{
    public IEnumerable<int> StudentIds { get; set; }
    public int TeacherId;
}