using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace _3w1m.Dtos.Course
{
    public class CourseCollectionQueryDto : BaseCollectionQueryDto
    {
        public string? Name { get; set; }

        public string[]? Code { get; set; }

        public DateOnly? StartDateFrom { get; set; }
        
        public DateOnly? StartDateTo { get; set; }
    }
}