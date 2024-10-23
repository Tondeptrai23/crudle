using _3w1m.Constants;
using _3w1m.Models.Domain;
using Microsoft.AspNetCore.Identity;
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
        var hasher = new PasswordHasher<User>();
        
        var listUser = new List<User>()
        {
            new User
            {
                UserName = "user1",
                Email = "test1@example.com",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = GuidGenerator.Generate().ToString(),
            },
            new User
            {
                UserName = "user2",
                Email = "test2@example.com",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = GuidGenerator.Generate().ToString(),
            },
            new User
            {
                UserName = "user3",
                Email = "test3@example.com",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = GuidGenerator.Generate().ToString(),
            },
            new User
            {
                UserName = "user4",
                Email = "test4@example.com",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = GuidGenerator.Generate().ToString(),
            },
            new User
            {
                UserName = "admin",
                Email = "admin@gmail.com",
                PasswordHash = hasher.HashPassword(null, "pass"),
                Id = GuidGenerator.Generate().ToString(),
            }
        };
        
        // Seed role
        var listRoles = new List<IdentityRole>()
        {
            new IdentityRole { Id = "1", Name = CourseRoles.Admin, NormalizedName = CourseRoles.Admin.ToUpper() },
            new IdentityRole { Id = "2", Name = CourseRoles.Teacher, NormalizedName = CourseRoles.Teacher.ToUpper() },
            new IdentityRole { Id = "3", Name = CourseRoles.Student, NormalizedName = CourseRoles.Student.ToUpper() }
        };
        modelBuilder.Entity<IdentityRole>().HasData(listRoles);

        modelBuilder.Entity<User>().HasData(listUser);

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string> { RoleId = "1", UserId = listUser[4].Id }
        );

        var listTeacher = new List<Teacher>()
        {
           new Teacher
           {
               TeacherId = 1,
               Fullname = "Teacher 1",
               ContactEmail = "example@gmail.com",
               ContactPhone = "0987654321",
               UserId = listUser[0].Id,
           }
        };
        modelBuilder.Entity<Teacher>().HasData(listTeacher);
        
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string> { RoleId = "2", UserId = listUser[0].Id }
        );
        
        
        var listStudent = new List<Student>()
        {
            new Student
            {
                StudentId = 1,
                Fullname = "Student 1",
                DateOfBirth = new DateOnly(2000, 1, 1),
                UserId = listUser[1].Id,
            },
            new Student
            {
                StudentId = 2,
                Fullname = "Student 2",
                DateOfBirth = new DateOnly(2000, 1, 1),
                UserId = listUser[2].Id,
            }
        };
        modelBuilder.Entity<Student>().HasData(listStudent);
        
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string> { RoleId = "3", UserId = listUser[1].Id },
            new IdentityUserRole<string> { RoleId = "3", UserId = listUser[2].Id }
        );
        
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

        modelBuilder.Entity<Course>().HasData(listCourse);
        modelBuilder.Entity<Enrollment>().HasData(listEnrollment);
    }

    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }

    public DbSet<Enrollment> Enrollments { get; set; }

    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    public static class GuidGenerator
    {
        private static int _counter = 0;

        public static Guid Generate()
        {
            var bytes = new byte[16];
            BitConverter.GetBytes(_counter++).CopyTo(bytes, 0);
            return new Guid(bytes);
        }
    }
}