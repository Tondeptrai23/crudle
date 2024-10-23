namespace _3w1m.Constants;

public static class CourseRoles
{
    public const string Admin = "Admin";

    public const string Teacher = "Teacher";

    public const string Student = "Student";

    public static string[] GetRoles()
    {
        return new string[] { Admin, Teacher, Student };
    }
}