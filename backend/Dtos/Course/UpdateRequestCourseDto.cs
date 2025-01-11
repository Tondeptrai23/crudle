namespace _3w1m.Dtos.Course
{
    public class UpdateRequestCourseDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public int? TeacherId { get; set; } = null;
    }
}