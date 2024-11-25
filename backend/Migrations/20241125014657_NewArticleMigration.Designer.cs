﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using _3w1m.Data;

#nullable disable

namespace _3w1m.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241125014657_NewArticleMigration")]
    partial class NewArticleMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("Roles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "1",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "2",
                            Name = "Teacher",
                            NormalizedName = "TEACHER"
                        },
                        new
                        {
                            Id = "3",
                            Name = "Student",
                            NormalizedName = "STUDENT"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("UserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles", (string)null);

                    b.HasData(
                        new
                        {
                            UserId = "00000000-0000-0000-0000-000000000005",
                            RoleId = "1"
                        },
                        new
                        {
                            UserId = "00000000-0000-0000-0000-000000000001",
                            RoleId = "2"
                        },
                        new
                        {
                            UserId = "00000000-0000-0000-0000-000000000002",
                            RoleId = "3"
                        },
                        new
                        {
                            UserId = "00000000-0000-0000-0000-000000000003",
                            RoleId = "3"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("UserTokens", (string)null);
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Article", b =>
                {
                    b.Property<int>("ArticleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ArticleId"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<string>("Summary")
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("ArticleId");

                    b.HasIndex("CourseId");

                    b.ToTable("Articles");

                    b.HasData(
                        new
                        {
                            ArticleId = 1,
                            Content = "Content 1",
                            CourseId = 1,
                            CreatedAt = new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7849),
                            Order = 1,
                            Summary = "Summary 1",
                            Title = "Article 1",
                            UpdatedAt = new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7871)
                        },
                        new
                        {
                            ArticleId = 2,
                            Content = "Content 2",
                            CourseId = 1,
                            CreatedAt = new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7873),
                            Order = 2,
                            Summary = "Summary 2",
                            Title = "Article 2",
                            UpdatedAt = new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7874)
                        });
                });

            modelBuilder.Entity("_3w1m.Models.Domain.ArticleProgress", b =>
                {
                    b.Property<int>("ArticleProgressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ArticleProgressId"));

                    b.Property<int>("ArticleId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("ReadAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.HasKey("ArticleProgressId");

                    b.HasIndex("ArticleId");

                    b.HasIndex("StudentId");

                    b.ToTable("ArticleProgresses");

                    b.HasData(
                        new
                        {
                            ArticleProgressId = 1,
                            ArticleId = 1,
                            ReadAt = new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(8043),
                            StudentId = 1
                        });
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Course", b =>
                {
                    b.Property<int>("CourseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("CourseId"));

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date");

                    b.Property<int?>("TeacherId")
                        .HasColumnType("int");

                    b.HasKey("CourseId");

                    b.HasIndex("TeacherId");

                    b.ToTable("Courses");

                    b.HasData(
                        new
                        {
                            CourseId = 1,
                            Code = "C001",
                            Description = "Description 1",
                            Name = "Course 1",
                            StartDate = new DateOnly(2022, 1, 1),
                            TeacherId = 1
                        },
                        new
                        {
                            CourseId = 2,
                            Code = "C002",
                            Description = "Description 2",
                            Name = "Course 2",
                            StartDate = new DateOnly(2022, 1, 1),
                            TeacherId = 1
                        });
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Enrollment", b =>
                {
                    b.Property<int>("CourseId")
                        .HasColumnType("int");

                    b.Property<int>("StudentId")
                        .HasColumnType("int");

                    b.Property<DateOnly>("EnrolledAt")
                        .HasColumnType("date");

                    b.Property<int>("EnrollmentId")
                        .HasColumnType("int");

                    b.HasKey("CourseId", "StudentId");

                    b.HasIndex("StudentId");

                    b.ToTable("Enrollments");

                    b.HasData(
                        new
                        {
                            CourseId = 1,
                            StudentId = 1,
                            EnrolledAt = new DateOnly(2022, 1, 1),
                            EnrollmentId = 0
                        },
                        new
                        {
                            CourseId = 2,
                            StudentId = 2,
                            EnrolledAt = new DateOnly(2022, 2, 1),
                            EnrollmentId = 0
                        });
                });

            modelBuilder.Entity("_3w1m.Models.Domain.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("ExpiryDate")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsRevoked")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("StudentId"));

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("StudentId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Students");

                    b.HasData(
                        new
                        {
                            StudentId = 1,
                            DateOfBirth = new DateOnly(2000, 1, 1),
                            Fullname = "Student 1",
                            UserId = "00000000-0000-0000-0000-000000000002"
                        },
                        new
                        {
                            StudentId = 2,
                            DateOfBirth = new DateOnly(2000, 1, 1),
                            Fullname = "Student 2",
                            UserId = "00000000-0000-0000-0000-000000000003"
                        });
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Teacher", b =>
                {
                    b.Property<int>("TeacherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("TeacherId"));

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ContactPhone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("TeacherId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Teachers");

                    b.HasData(
                        new
                        {
                            TeacherId = 1,
                            ContactEmail = "example@gmail.com",
                            ContactPhone = "0987654321",
                            Fullname = "Teacher 1",
                            UserId = "00000000-0000-0000-0000-000000000001"
                        });
                });

            modelBuilder.Entity("_3w1m.Models.Domain.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("Users", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "00000000-0000-0000-0000-000000000001",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "eff4371c-2b39-4e1d-9e78-db4f4830f4cb",
                            Email = "test1@example.com",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedEmail = "TEST1@EXAMPLE.COM",
                            NormalizedUserName = "USER1",
                            PasswordHash = "AQAAAAIAAYagAAAAENQcpANapISpxxJqtRWrjBbrwB2zfxfySEHrI8iTwX+4w4gaS7PLqgjr9RFNmeuf8Q==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "e59b2a7f-be98-4ec8-9a88-abe4b0a88f06",
                            TwoFactorEnabled = false,
                            UserName = "user1"
                        },
                        new
                        {
                            Id = "00000000-0000-0000-0000-000000000002",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "269491d1-7f5a-4b08-92d1-9d54f3a8369a",
                            Email = "test2@example.com",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedEmail = "TEST2@EXAMPLE.COM",
                            NormalizedUserName = "USER2",
                            PasswordHash = "AQAAAAIAAYagAAAAEMSpoTT5vT4I9kc/jZ1xAW/xq7aR9o9UdhnT0/CzlKWf+dvFXoLsO/kLe7P6oFearQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "42688773-8ba7-42b1-a62e-da877a03d4a3",
                            TwoFactorEnabled = false,
                            UserName = "user2"
                        },
                        new
                        {
                            Id = "00000000-0000-0000-0000-000000000003",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "00f9efb3-b069-4aea-b7ba-ecc118e9c039",
                            Email = "test3@example.com",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedEmail = "TEST3@EXAMPLE.COM",
                            NormalizedUserName = "USER3",
                            PasswordHash = "AQAAAAIAAYagAAAAEGXYxJfQrMWgXtTnZyZ/gJmKYEnAS9oVm+lkYz4bTpsMhJipEh2AtSXMVX5vA1o8/A==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "6cbb6f52-8b5f-406b-81a3-4a844f7e6498",
                            TwoFactorEnabled = false,
                            UserName = "user3"
                        },
                        new
                        {
                            Id = "00000000-0000-0000-0000-000000000004",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "ef7fa9d5-c64d-4f1a-8a35-e2be58fff05c",
                            Email = "test4@example.com",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedEmail = "TEST4@EXAMPLE.COM",
                            NormalizedUserName = "USER4",
                            PasswordHash = "AQAAAAIAAYagAAAAEJNVSJOT0QPfestEAI/EAQvs2terqO1bo3IY1seTMwtUGrkDB77DiGSv35qrZwxOmQ==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "9ba01d0a-4d78-4b0c-9bae-741f5f4b8fd5",
                            TwoFactorEnabled = false,
                            UserName = "user4"
                        },
                        new
                        {
                            Id = "00000000-0000-0000-0000-000000000005",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "8d4b2a65-b9a5-4a11-8c3e-3b5e3c851c78",
                            Email = "admin@gmail.com",
                            EmailConfirmed = false,
                            LockoutEnabled = false,
                            NormalizedEmail = "ADMIN@EXAMPLE.COM",
                            NormalizedUserName = "ADMIN",
                            PasswordHash = "AQAAAAIAAYagAAAAEOqVN/FMKAO04Q4gQdP2TXlQTLGt488x94r1zSq3tOicjsS1Cy3RHkVI5RSlrZ5gQA==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "7c03d9bb-aed0-4a8a-9c46-380e9fec4c13",
                            TwoFactorEnabled = false,
                            UserName = "admin"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("_3w1m.Models.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Article", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.Course", "Course")
                        .WithMany("Articles")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.ArticleProgress", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.Article", "Article")
                        .WithMany("ArticleProgresses")
                        .HasForeignKey("ArticleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("_3w1m.Models.Domain.Student", "Student")
                        .WithMany("ArticleProgresses")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Article");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Course", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.Teacher", "Teacher")
                        .WithMany()
                        .HasForeignKey("TeacherId");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Enrollment", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.Course", "Course")
                        .WithMany("Enrollments")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("_3w1m.Models.Domain.Student", "Student")
                        .WithMany("Enrollments")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.RefreshToken", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.User", "User")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Student", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.User", "User")
                        .WithOne()
                        .HasForeignKey("_3w1m.Models.Domain.Student", "UserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("User");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Teacher", b =>
                {
                    b.HasOne("_3w1m.Models.Domain.User", "User")
                        .WithOne()
                        .HasForeignKey("_3w1m.Models.Domain.Teacher", "UserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("User");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Article", b =>
                {
                    b.Navigation("ArticleProgresses");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Course", b =>
                {
                    b.Navigation("Articles");

                    b.Navigation("Enrollments");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.Student", b =>
                {
                    b.Navigation("ArticleProgresses");

                    b.Navigation("Enrollments");
                });

            modelBuilder.Entity("_3w1m.Models.Domain.User", b =>
                {
                    b.Navigation("RefreshTokens");
                });
#pragma warning restore 612, 618
        }
    }
}
