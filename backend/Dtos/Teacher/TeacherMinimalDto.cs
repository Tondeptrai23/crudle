using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace _3w1m.Dtos.Teacher;

public class TeacherMinimalDto
{
    public int TeacherId { get; set; }
    public string Fullname { get; set; }
}