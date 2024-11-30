using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3w1m.Dtos.Course;

public class EnrollStudentToCourseRequestDto
{
    public IEnumerable<int> StudentIds { get; set; }
}