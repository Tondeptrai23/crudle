using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class AddExamModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExamId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Exams",
                columns: table => new
                {
                    ExamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exams", x => x.ExamId);
                    table.ForeignKey(
                        name: "FK_Exams_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ExamQuestions",
                columns: table => new
                {
                    ExamQuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ExamId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamQuestions", x => x.ExamQuestionId);
                    table.ForeignKey(
                        name: "FK_ExamQuestions_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "ExamId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ExamSubmissions",
                columns: table => new
                {
                    SubmissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StartedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SubmittedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: true),
                    ExamId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamSubmissions", x => x.SubmissionId);
                    table.ForeignKey(
                        name: "FK_ExamSubmissions_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "ExamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamSubmissions_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ExamAnswers",
                columns: table => new
                {
                    AnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ExamQuestionId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsCorrect = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamAnswers", x => x.AnswerId);
                    table.ForeignKey(
                        name: "FK_ExamAnswers_ExamQuestions_ExamQuestionId",
                        column: x => x.ExamQuestionId,
                        principalTable: "ExamQuestions",
                        principalColumn: "ExamQuestionId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudentAnswerExam",
                columns: table => new
                {
                    StudentAnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ExamQuestionId = table.Column<int>(type: "int", nullable: false),
                    SubmissionId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentAnswerExam", x => x.StudentAnswerId);
                    table.ForeignKey(
                        name: "FK_StudentAnswerExam_ExamQuestions_ExamQuestionId",
                        column: x => x.ExamQuestionId,
                        principalTable: "ExamQuestions",
                        principalColumn: "ExamQuestionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentAnswerExam_ExamSubmissions_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "ExamSubmissions",
                        principalColumn: "SubmissionId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9431));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(8929), new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(8992) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9003), new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9020) });

            migrationBuilder.UpdateData(
                table: "AssignmentSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9582));

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9206), new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9210) });

            migrationBuilder.InsertData(
                table: "Exams",
                columns: new[] { "ExamId", "Content", "CourseId", "CreatedAt", "Duration", "EndDate", "Name", "StartDate", "UpdatedAt" },
                values: new object[] { 1, "Content 1", 3, new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9723), 60, new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Exam 1", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9725) });

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "QuestionId",
                keyValue: 1,
                column: "ExamId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Questions",
                keyColumn: "QuestionId",
                keyValue: 2,
                column: "ExamId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a75c344e-6dae-4806-9bd4-b483ebe0e5b4", "AQAAAAIAAYagAAAAEFvksrT8/YrWKlhF0VAMn7IXemHMn4PpVSdDI8EU6qM7btS4SXHvhXhCwQvbZ3Ozlg==", "b9474af6-ed69-41d6-ab52-eecb616e1f6c" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "024d9f6f-f3ef-4144-bc4f-df968c15b7c1", "AQAAAAIAAYagAAAAENMc+/WOBWcbnocA39WcW3CPAFEgeonWv5VzLnnTpa5lKCrEFTNDRnNiEAiXP7tnJw==", "652a1e16-85f9-4f91-8016-0257a7b76476" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d03ed951-0c53-476b-949e-28af4dd7b480", "AQAAAAIAAYagAAAAEFbUi6zHNJ5cUK7KIHDU2UB+0zSLef+0bhyU38J4RWC9d5Up2oSMRfe8aX3jF9SFfA==", "21a8ac85-27f6-426a-b0a5-05d54b14215f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fa9e16d7-e1f2-4134-a24b-83fca1b37d0b", "AQAAAAIAAYagAAAAEPWSSjUf6XkiOkbdGohJV8L43xCq4nRKMyZnmDghQ/9bRgTB8ICE3G+8r5dpyJxYkA==", "4aad82cc-f0af-489c-868d-9c867a447ec0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2af4266d-1cc1-4248-a6f2-07073e26896d", "AQAAAAIAAYagAAAAEGUCu8iys1VUWXbItInQozcyGbM25FT4mSQL35imBATcKfvpBYJpF4rGybcxIqDO5Q==", "b32243e1-c81c-4849-ba10-960ba728cefc" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b009aed1-b18c-4105-a928-6e054b24194b", "AQAAAAIAAYagAAAAEOC7NcmdheSgdpZfyuY0ANvR8WxGdJOsQr0DbCJwtfqabjsQBacIVwe3SIjTNjmvuw==", "f06e01c3-2372-42a0-983a-c840bc811ccc" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2c34fa61-8d45-42d5-bf0c-3769b4790e11", "AQAAAAIAAYagAAAAEFrxJeG07fQtKpMZ4ONGsFnjCkU9wxfLp6b1dkUmOJ8ypPwzhRejOEpHgebVNshXHA==", "608502e8-0128-48a8-a54a-afe625cce607" });

            migrationBuilder.InsertData(
                table: "ExamQuestions",
                columns: new[] { "ExamQuestionId", "Content", "ExamId", "Type" },
                values: new object[,]
                {
                    { 1, "Question 1", 1, "Multiple Choice" },
                    { 2, "Question 2", 1, "Multiple Choice" }
                });

            migrationBuilder.InsertData(
                table: "ExamSubmissions",
                columns: new[] { "SubmissionId", "ExamId", "Score", "StartedAt", "StudentId", "SubmittedAt" },
                values: new object[] { 1, 1, null, new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9853), 2, new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9855) });

            migrationBuilder.InsertData(
                table: "StudentAnswerExam",
                columns: new[] { "StudentAnswerId", "ExamQuestionId", "SubmissionId", "Value" },
                values: new object[,]
                {
                    { 1, 1, 1, "Answer 1" },
                    { 2, 2, 1, "Answer 3" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ExamId",
                table: "Questions",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamAnswers_ExamQuestionId",
                table: "ExamAnswers",
                column: "ExamQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamQuestions_ExamId",
                table: "ExamQuestions",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_CourseId",
                table: "Exams",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamSubmissions_ExamId",
                table: "ExamSubmissions",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_ExamSubmissions_StudentId",
                table: "ExamSubmissions",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAnswerExam_ExamQuestionId",
                table: "StudentAnswerExam",
                column: "ExamQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAnswerExam_SubmissionId",
                table: "StudentAnswerExam",
                column: "SubmissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "ExamId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "ExamAnswers");

            migrationBuilder.DropTable(
                name: "StudentAnswerExam");

            migrationBuilder.DropTable(
                name: "ExamQuestions");

            migrationBuilder.DropTable(
                name: "ExamSubmissions");

            migrationBuilder.DropTable(
                name: "Exams");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ExamId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ExamId",
                table: "Questions");

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2459));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2077), new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2101) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2108), new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2108) });

            migrationBuilder.UpdateData(
                table: "AssignmentSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2616));

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2264), new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2265) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "17881c84-8622-495d-9543-800e5db6751e", "AQAAAAIAAYagAAAAEOSntv90CZn8OO1iK3VZuDFfB9HyW+CTm3D63LHi3+JNtUVwoyImC6YfVo9NDd+zSQ==", "fad5681c-4fdd-4164-a914-64ddd71aa27a" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7f08695c-a46a-41bd-9252-13282f34c313", "AQAAAAIAAYagAAAAELYGSnjv18s1htjXklX7+1TvsbGKkMkMIsc3pdfZqOqqNGFqwm8Uqa+34gLr1eHn6Q==", "88385907-7c0b-4efc-ae2b-f95bf1566fc9" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "120559d3-6b05-4707-86de-d8bfa46ad0c8", "AQAAAAIAAYagAAAAEKSa2HlPxtj6gv4vUChz6RtngQawJcjl20YH5Q2ql5hZLu3lA9pMJ9GCtSaYcVj0dQ==", "e852cab9-fc31-4740-b0d0-76ceadf060d9" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d8b4811e-1b92-4dc4-9845-9934ad08b0be", "AQAAAAIAAYagAAAAEIFLcJxX1O1M3yz2aBSUdlvw8WQ4Fz64phAjhYCMd9fI7FPYa4AIaelD14QjHc+otg==", "27efdcc3-fc2c-402e-b0d6-28288aa172ee" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "199ff492-eb1f-423e-8ba9-b96e54c92514", "AQAAAAIAAYagAAAAEGQlLsqVaQRpu0fnsGhsVnL4iMEav2cJk9xRU+/CNO/gED8ZHjCu9G6V/9+utcULPQ==", "80c08382-3591-4d01-80a9-bcecac5fd12e" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b39b3329-9c63-4921-8626-a357db9637b3", "AQAAAAIAAYagAAAAEEmStVoMAQchGYU59J63j/z7BC2gLyzq0y6QsxAhxhj95g+SH5fNhZTOrQ46Y4CxKQ==", "5b17c5f3-a957-4e67-ac3a-ec611febd1dd" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "30085f64-64d4-446c-8f72-652c0e58bcfd", "AQAAAAIAAYagAAAAEHNQ5q1laerkhBednxO7cRBG8enCZKxZryZlvTrgx3KJIjE8UZb3VsdigDM/WLvhfg==", "623ff0f7-4ddf-4ec0-987e-7949f16258f9" });
        }
    }
}
