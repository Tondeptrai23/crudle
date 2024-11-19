using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace _3w1m.Dtos.Course
{
    public class CourseCollectionQueryDto : BaseCollectionQueryDto
    {
        public int? CourseId { get; set; }

        public string? Name { get; set; }

        public string? Code { get; set; }

        public DateOnly? StartDate { get; set; }
    }
}