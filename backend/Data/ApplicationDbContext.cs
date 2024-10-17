using _3w1m.Models.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Data;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var tableName = entityType.GetTableName();
            if (tableName.StartsWith("AspNet"))
            {
                entityType.SetTableName(tableName.Substring(6));
            }
        }

        // Relationships
        modelBuilder.Entity<Teacher>()
            .HasOne<User>(t => t.User)
            .WithOne()
            .HasForeignKey<Teacher>(t => t.UserId);

        modelBuilder.Entity<Student>()
            .HasOne<User>(s => s.User)
            .WithOne()
            .HasForeignKey<Student>(s => s.UserId);

        modelBuilder.Entity<Course>()
            .HasOne<Teacher>(c => c.Teacher)
            .WithMany()
            .HasForeignKey(c => c.TeacherId);

        modelBuilder.Entity<Enrollment>()
            .HasKey(e => new { e.CourseId, e.StudentId });

        modelBuilder.Entity<Enrollment>()
            .HasOne(e => e.Course)
            .WithMany(c => c.Enrollments)
            .HasForeignKey(e => e.CourseId);

        modelBuilder.Entity<Enrollment>()
            .HasOne(e => e.Student)
            .WithMany(s => s.Enrollments)
            .HasForeignKey(e => e.StudentId);

        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(rt => rt.UserId);
        
        // Seed data 
        var listTeacher = new List<Teacher>()
        {
           new Teacher
           {
               TeacherId = 1,
               Fullname = "Teacher 1",
               ContactEmail = "example@gmail.com",
               ContactPhone = "0987654321",
           }
        };

        var listCourse = new List<Course>()
        {
            new Course
            {
                CourseId = 1,
                Name = "Course 1",
                Description = "Description 1",
                Code = "C001",
                StartDate = new DateOnly(2022, 1, 1),
                TeacherId = 1
            },
            new Course
            {
                CourseId = 2,
                Name = "Course 2",
                Description = "Description 2",
                Code = "C002",
                StartDate = new DateOnly(2022, 1, 1),
                TeacherId = 1
            }
        };

        var listStudent = new List<Student>()
        {
            new Student
            {
                StudentId = 1,
                Fullname = "Student 1",
                DateOfBirth = new DateOnly(2000, 1, 1),
            },
            new Student
            {
                StudentId = 2,
                Fullname = "Student 2",
                DateOfBirth = new DateOnly(2000, 1, 1),
            }
        };

        var listEnrollment = new List<Enrollment>()
        {
            new Enrollment
            {
                CourseId = 1,
                StudentId = 1,
                EnrolledAt = new DateOnly(2022, 1, 1),
            },
            new Enrollment
            {
                CourseId = 2,
                StudentId = 2,
                EnrolledAt = new DateOnly(2022, 2, 1),
            }
        };

        modelBuilder.Entity<Teacher>().HasData(listTeacher);
        modelBuilder.Entity<Course>().HasData(listCourse);
        modelBuilder.Entity<Student>().HasData(listStudent);
        modelBuilder.Entity<Enrollment>().HasData(listEnrollment);
    }

    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }

    public DbSet<Enrollment> Enrollments { get; set; }

    public DbSet<Teacher> Teachers { get; set; }

    public DbSet<RefreshToken> RefreshTokens { get; set; }
}