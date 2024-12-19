using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class AssignmentMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Enrollments",
                keyColumns: new[] { "CourseId", "StudentId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.CreateTable(
                name: "Assignments",
                columns: table => new
                {
                    AssignmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DueDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assignments", x => x.AssignmentId);
                    table.ForeignKey(
                        name: "FK_Assignments_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AssignmentId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_Assignments_AssignmentId",
                        column: x => x.AssignmentId,
                        principalTable: "Assignments",
                        principalColumn: "AssignmentId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    AnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsCorrect = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.AnswerId);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(1065));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(681), new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(703) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(710), new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(711) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a7ba2199-c651-41bc-8f89-686838f2bb95", "AQAAAAIAAYagAAAAEO/GVI6oHYb5STDvurwVD38TVNkX/9YYG3Bfr9G7J321GYmTy3OCrXmsNUe268NKng==", "f8ec1916-e35b-4c9d-964f-cc84988e392e" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "22f3aff4-5053-4c71-b825-ea91feec085e", "AQAAAAIAAYagAAAAEDOiXG3x3k0BF/y3B9HyhGEyQ0iKjffFaCY3QvETsPjEZ4sb9DfDVfOwLvhJkpzJ7A==", "fb6beaac-1ad4-4773-80e7-d4553a1af117" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d825393f-d50f-4252-a678-e47813066be5", "AQAAAAIAAYagAAAAEFiLhxnukwZZScuLC7t37bGNBerF5DijgW4+ypaAoN/XSz/Rg8w+7NNbCKdcjpYZGA==", "7911bccd-fe4f-4b92-ad2f-861bcc187d30" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c64975af-16d8-498f-863b-4d434baa4091", "AQAAAAIAAYagAAAAEImQyHnBU37FWLsWDRrsCTaJ1L3Nd6ebxhoApn9XrIiqTdObxgpDdygwDRibgjxxBQ==", "ae547c7f-1f15-478c-a74a-760cb32cf8dc" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9290a193-e299-4f0e-b648-a38823e20dfe", "AQAAAAIAAYagAAAAEGjrI9Z8s2IWcTkE4UwvzfjkYHLpUALcOPsaLbHBsyWC5cm/6jT+LMur3iVGWHeEJw==", "0a088ae1-f6ae-4548-9073-6fd9f53679b8" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "00000000-0000-0000-0000-000000000006", 0, "779032ed-5b00-4d0e-ab16-59cc0396d111", "teacher@example.com", false, false, null, "TEACHER@EXAMPLE.COM", "teacher", "AQAAAAIAAYagAAAAEJlkWrq9LdQOS+O4/+9EoaleqJlAv1/mUIkOO5buuuSzhuMMVaGUc56/ITW+ep+kTg==", null, false, "df882d53-df7a-4ea2-9689-8392e7aaed3d", false, "teacher" },
                    { "00000000-0000-0000-0000-000000000007", 0, "23bace04-4f85-43d1-9129-048ef766471a", "student@example.com", false, false, null, "STUDENT@EXAMPLE.COM", "STUDENT", "AQAAAAIAAYagAAAAEG1YsobPWIQ4EqkQHWQ3//Y2gJdn6nUEIWmue9+heNfsDeJepbiyycVfiAIHl5eG9g==", null, false, "7e94cfdd-d883-4fba-a58b-0b1fe3d10ee5", false, "student" }
                });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "StudentId", "DateOfBirth", "Fullname", "UserId" },
                values: new object[] { 3, new DateOnly(2000, 1, 1), "Student 3", "00000000-0000-0000-0000-000000000007" });

            migrationBuilder.InsertData(
                table: "Teachers",
                columns: new[] { "TeacherId", "ContactEmail", "ContactPhone", "Fullname", "UserId" },
                values: new object[] { 2, "teacher", "0987654321", "teacher", "00000000-0000-0000-0000-000000000006" });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "2", "00000000-0000-0000-0000-000000000006" },
                    { "3", "00000000-0000-0000-0000-000000000007" }
                });

            migrationBuilder.InsertData(
                table: "Courses",
                columns: new[] { "CourseId", "Code", "Description", "Name", "StartDate", "TeacherId" },
                values: new object[] { 3, "C003", "Description 3", "Course test assignment", new DateOnly(2024, 1, 1), 2 });

            migrationBuilder.InsertData(
                table: "Assignments",
                columns: new[] { "AssignmentId", "Content", "CourseId", "CreatedAt", "DueDate", "Name", "UpdatedAt" },
                values: new object[] { 1, "Content 1", 3, new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(879), new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Assignment 1", new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(880) });

            migrationBuilder.InsertData(
                table: "Enrollments",
                columns: new[] { "CourseId", "StudentId", "EnrolledAt", "EnrollmentId" },
                values: new object[] { 3, 2, new DateOnly(2022, 2, 1), 0 });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "QuestionId", "AssignmentId", "Name", "Type" },
                values: new object[,]
                {
                    { 1, 1, "Question 1", "Multiple Choice" },
                    { 2, 1, "Question 2", "Multiple Choice" }
                });

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "AnswerId", "IsCorrect", "QuestionId", "Value" },
                values: new object[,]
                {
                    { 1, true, 1, "Answer 1" },
                    { 2, false, 1, "Answer 2" },
                    { 3, true, 2, "Answer 3" },
                    { 4, false, 2, "Answer 4" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Assignments_CourseId",
                table: "Assignments",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_AssignmentId",
                table: "Questions",
                column: "AssignmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Assignments");

            migrationBuilder.DeleteData(
                table: "Enrollments",
                keyColumns: new[] { "CourseId", "StudentId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2", "00000000-0000-0000-0000-000000000006" });

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "3", "00000000-0000-0000-0000-000000000007" });

            migrationBuilder.DeleteData(
                table: "Courses",
                keyColumn: "CourseId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007");

            migrationBuilder.DeleteData(
                table: "Teachers",
                keyColumn: "TeacherId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006");

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(8043));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7849), new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7871) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7873), new DateTime(2024, 11, 25, 8, 46, 56, 813, DateTimeKind.Local).AddTicks(7874) });

            migrationBuilder.InsertData(
                table: "Enrollments",
                columns: new[] { "CourseId", "StudentId", "EnrolledAt", "EnrollmentId" },
                values: new object[] { 2, 2, new DateOnly(2022, 2, 1), 0 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "eff4371c-2b39-4e1d-9e78-db4f4830f4cb", "AQAAAAIAAYagAAAAENQcpANapISpxxJqtRWrjBbrwB2zfxfySEHrI8iTwX+4w4gaS7PLqgjr9RFNmeuf8Q==", "e59b2a7f-be98-4ec8-9a88-abe4b0a88f06" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "269491d1-7f5a-4b08-92d1-9d54f3a8369a", "AQAAAAIAAYagAAAAEMSpoTT5vT4I9kc/jZ1xAW/xq7aR9o9UdhnT0/CzlKWf+dvFXoLsO/kLe7P6oFearQ==", "42688773-8ba7-42b1-a62e-da877a03d4a3" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "00f9efb3-b069-4aea-b7ba-ecc118e9c039", "AQAAAAIAAYagAAAAEGXYxJfQrMWgXtTnZyZ/gJmKYEnAS9oVm+lkYz4bTpsMhJipEh2AtSXMVX5vA1o8/A==", "6cbb6f52-8b5f-406b-81a3-4a844f7e6498" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ef7fa9d5-c64d-4f1a-8a35-e2be58fff05c", "AQAAAAIAAYagAAAAEJNVSJOT0QPfestEAI/EAQvs2terqO1bo3IY1seTMwtUGrkDB77DiGSv35qrZwxOmQ==", "9ba01d0a-4d78-4b0c-9bae-741f5f4b8fd5" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8d4b2a65-b9a5-4a11-8c3e-3b5e3c851c78", "AQAAAAIAAYagAAAAEOqVN/FMKAO04Q4gQdP2TXlQTLGt488x94r1zSq3tOicjsS1Cy3RHkVI5RSlrZ5gQA==", "7c03d9bb-aed0-4a8a-9c46-380e9fec4c13" });
        }
    }
}
