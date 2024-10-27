using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3w1m.Dtos.Course
{
    public class UpdateCourseRequestDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? TeacherId { get; set; } = null;
    }
}