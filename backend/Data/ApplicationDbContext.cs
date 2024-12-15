using _3w1m.Constants;
using _3w1m.Dtos.Article;
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
            .HasForeignKey<Teacher>(t => t.UserId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Student>()
            .HasOne<User>(s => s.User)
            .WithOne()
            .HasForeignKey<Student>(s => s.UserId)
            .OnDelete(DeleteBehavior.SetNull);

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
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Article>()
            .HasOne(a => a.Course)
            .WithMany(c => c.Articles);

        modelBuilder.Entity<ArticleProgress>().HasKey(ag => ag.ArticleProgressId);
        modelBuilder.Entity<ArticleProgress>()
            .HasOne(ag => ag.Article)
            .WithMany(ar => ar.ArticleProgresses)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ArticleProgress>()
            .HasOne(ag => ag.Student)
            .WithMany(st => st.ArticleProgresses)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Answer>()
            .HasOne<Question>(ans => ans.Question)
            .WithMany(ques => ques.Answers)
            .HasForeignKey(ans => ans.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Question>()
            .HasOne<Assignment>(ques => ques.Assignment)
            .WithMany(asgmt => asgmt.Questions)
            .HasForeignKey(ques => ques.AssignmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Assignment>()
            .HasOne<Course>(asgmt => asgmt.Course)
            .WithMany(c => c.Assignments)
            .HasForeignKey(asgmt => asgmt.CourseId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<AssignmentSubmission>()
            .HasKey(asgmtSub => asgmtSub.SubmissionId);
        
        modelBuilder.Entity<AssignmentSubmission>()
            .HasOne<Assignment>(asgmtSub => asgmtSub.Assignment)
            .WithMany(asgmt => asgmt.Submissions)
            .HasForeignKey(asgmtSub => asgmtSub.AssignmentId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<AssignmentSubmission>()
            .HasOne<Student>(asgmtSub => asgmtSub.Student)
            .WithMany(st => st.Submissions)
            .HasForeignKey(asgmtSub => asgmtSub.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StudentAnswer>()
            .HasOne<Question>(stAns => stAns.Question)
            .WithMany(ques => ques.StudentAnswers)
            .HasForeignKey(stAns => stAns.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<StudentAnswer>()
            .HasOne<AssignmentSubmission>(stAns => stAns.Submission)
            .WithMany(asgmtSub => asgmtSub.Answers)
            .HasForeignKey(stAns => stAns.SubmissionId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // Seed data 
        var hasher = new PasswordHasher<User>();

        var listUser = new List<User>()
        {
            new User
            {
                UserName = "user1",
                NormalizedUserName = "USER1",
                Email = "test1@example.com",
                NormalizedEmail = "TEST1@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = UserSeeding.User1Id
            },
            new User
            {
                UserName = "user2",
                NormalizedUserName = "USER2",
                Email = "test2@example.com",
                NormalizedEmail = "TEST2@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = UserSeeding.User2Id
            },
            new User
            {
                UserName = "user3",
                NormalizedUserName = "USER3",
                Email = "test3@example.com",
                NormalizedEmail = "TEST3@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = UserSeeding.User3Id
            },
            new User
            {
                UserName = "user4",
                NormalizedUserName = "USER4",
                Email = "test4@example.com",
                NormalizedEmail = "TEST4@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = UserSeeding.User4Id
            },
            new User
            {
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@gmail.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "pass"),
                Id = UserSeeding.AdminId
            },
            new User
            {
                UserName = "teacher",
                NormalizedUserName = "teacher",
                Email = "teacher@example.com",
                NormalizedEmail = "TEACHER@EXAMPLE.COM",
                PasswordHash = hasher.HashPassword(null, "1"),
                Id = UserSeeding.TeacherId
            },
            new User
            {
                UserName="student",
                NormalizedUserName="STUDENT",
                Email="student@example.com",
                NormalizedEmail="STUDENT@EXAMPLE.COM",
                PasswordHash=hasher.HashPassword(null, "1"),
                Id = UserSeeding.StudentId
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
           },
           new Teacher
           {
                TeacherId = 2,
                Fullname = "teacher",
                ContactEmail = "teacher",
                ContactPhone = "0987654321",
                UserId = listUser[5].Id
            }
        };
        modelBuilder.Entity<Teacher>().HasData(listTeacher);

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string> { RoleId = "2", UserId = listUser[0].Id },
            new IdentityUserRole<string> { RoleId = "2", UserId = listUser[5].Id }
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
            },
            new Student
            {
                StudentId = 3,
                Fullname = "Student 3",
                DateOfBirth = new DateOnly(2000, 1, 1),
                UserId = listUser[6].Id,
            }
        };
        modelBuilder.Entity<Student>().HasData(listStudent);

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string> { RoleId = "3", UserId = listUser[1].Id },
            new IdentityUserRole<string> { RoleId = "3", UserId = listUser[2].Id },
            new IdentityUserRole<string> { RoleId = "3", UserId = listUser[6].Id }
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
            },
            new() {
                CourseId = 3,
                Name = "Course test assignment",
                Description = "Description 3",
                Code = "C003",
                StartDate = new DateOnly(2024, 1, 1),
                TeacherId = 2
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
                CourseId = 3,
                StudentId = 2,
                EnrolledAt = new DateOnly(2022, 2, 1),
            }
        };

        modelBuilder.Entity<Course>().HasData(listCourse);
        modelBuilder.Entity<Enrollment>().HasData(listEnrollment);

        var listArticle = new List<Article>()
        {
            new()
            {
                ArticleId = 1,
                CourseId = 1,
                Title = "Article 1",
                Summary = "Summary 1",
                Content = "Content 1",
                Order = 1,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            },
            new()
            {
                ArticleId = 2,
                CourseId = 1,
                Title = "Article 2",
                Summary = "Summary 2",
                Content = "Content 2",
                Order = 2,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            }
        };
        modelBuilder.Entity<Article>().HasData(listArticle);

        var listAnswer = new List<Answer>()
        {
            new()
            {
                AnswerId = 1,
                QuestionId = 1,
                Value = "Answer 1",
                IsCorrect = true
            },
            new()
            {
                AnswerId = 2,
                QuestionId = 1,
                Value = "Answer 2",
                IsCorrect = false
            },
            new()
            {
                AnswerId = 3,
                QuestionId = 2,
                Value = "Answer 3",
                IsCorrect = true
            },
            new()
            {
                AnswerId = 4,
                QuestionId = 2,
                Value = "Answer 4",
                IsCorrect = false
            }
        };

        var listQuestion = new List<Question>()
        {
            new()
            {
                QuestionId = 1,
                AssignmentId = 1,
                Name = "Question 1",
                Type = "Multiple Choice",
            },
            new()
            {
                QuestionId = 2,
                AssignmentId = 1,
                Name = "Question 2",
                Type = "Multiple Choice",
            }
        };

        var listAssignment = new List<Assignment>()
        {
            new()
            {
                AssignmentId = 1,
                CourseId = 3,
                Name = "Assignment 1",
                Content = "Content 1",
                DueDate = new DateTime(2025, 1, 1),
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            }
        };

        modelBuilder.Entity<Answer>().HasData(listAnswer);
        modelBuilder.Entity<Question>().HasData(listQuestion);
        modelBuilder.Entity<Assignment>().HasData(listAssignment);

        modelBuilder.Entity<ArticleProgress>().HasData(
            new List<ArticleProgress>() {
                new() {
                    ArticleProgressId = 1,
                    ArticleId = 1,
                    StudentId = 1,
                    ReadAt = DateTime.Now
                }
            }
        );
        
        modelBuilder.Entity<AssignmentSubmission>().HasData(
            new List<AssignmentSubmission>() {
                new() {
                    SubmissionId = 1,
                    AssignmentId = 1,
                    StudentId = 2,
                    SubmittedAt = DateTime.Now
                }
            }
        );
        
        modelBuilder.Entity<StudentAnswer>().HasData(
            new List<StudentAnswer>() {
                new() {
                    StudentAnswerId = 1,
                    QuestionId = 1,
                    SubmissionId = 1,
                    Value = "Answer 1"
                },
                new() {
                    StudentAnswerId = 2,
                    QuestionId = 2,
                    SubmissionId = 1,
                    Value = "Answer 3"
                }
            }
        );
    }

    public DbSet<Student> Students { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleProgress> ArticleProgresses { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Assignment> Assignments { get; set; }
    
    public DbSet<AssignmentSubmission> AssignmentSubmissions { get; set; }
    
    public DbSet<StudentAnswer> StudentAnswers { get; set; }

    private static class UserSeeding
    {
        // Define constant GUIDs for each user
        public static readonly string User1Id = "00000000-0000-0000-0000-000000000001";
        public static readonly string User2Id = "00000000-0000-0000-0000-000000000002";
        public static readonly string User3Id = "00000000-0000-0000-0000-000000000003";
        public static readonly string User4Id = "00000000-0000-0000-0000-000000000004";
        public static readonly string AdminId = "00000000-0000-0000-0000-000000000005";
        public static readonly string TeacherId = "00000000-0000-0000-0000-000000000006";
        public static readonly string StudentId = "00000000-0000-0000-0000-000000000007";
    }
}