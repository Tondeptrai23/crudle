using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3w1m.Dtos.Teacher;
public class TeacherCollectionQueryDto: BaseCollectionQueryDto
{
    
    public int? TeacherId { get; set; } = null;

    public string? Fullname { get; set; } = null;

    public string ContactEmail { get; set; }
    
    public string ContactPhone { get; set; }
}