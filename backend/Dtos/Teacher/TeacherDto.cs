using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _3w1m.Dtos.Teacher;
public class TeacherDto
{
    public int TeacherId { get; set; }
    
    public string Fullname { get; set; }

    public string ContactEmail { get; set; }

    public string ContactPhone { get; set; }

    public string? UserId { get; set; }
    
    public string? Email { get; set; }
}