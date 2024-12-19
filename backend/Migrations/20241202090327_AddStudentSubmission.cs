using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class AddStudentSubmission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CanRetry",
                table: "Assignments",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CanViewScore",
                table: "Assignments",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "AssignmentSubmissions",
                columns: table => new
                {
                    SubmissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SubmittedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Score = table.Column<double>(type: "double", nullable: false),
                    AssignmentId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssignmentSubmissions", x => x.SubmissionId);
                    table.ForeignKey(
                        name: "FK_AssignmentSubmissions_Assignments_AssignmentId",
                        column: x => x.AssignmentId,
                        principalTable: "Assignments",
                        principalColumn: "AssignmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssignmentSubmissions_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "StudentAnswers",
                columns: table => new
                {
                    StudentAnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    QuestionId = table.Column<int>(type: "int", nullable: false),
                    SubmissionId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentAnswers", x => x.StudentAnswerId);
                    table.ForeignKey(
                        name: "FK_StudentAnswers_AssignmentSubmissions_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "AssignmentSubmissions",
                        principalColumn: "SubmissionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentAnswers_Questions_QuestionId",
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
                value: new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6347));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5947), new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5969) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5976), new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5976) });

            migrationBuilder.InsertData(
                table: "AssignmentSubmissions",
                columns: new[] { "SubmissionId", "AssignmentId", "Score", "StudentId", "SubmittedAt" },
                values: new object[] { 1, 1, 0.0, 2, new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6488) });

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CanRetry", "CanViewScore", "CreatedAt", "UpdatedAt" },
                values: new object[] { false, false, new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6139), new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6140) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dbf4ead6-888b-403a-8151-e8eae6f4f99d", "AQAAAAIAAYagAAAAEGfDuNni6jWRzpt+WpLJ4UMLwm7LxpM7sBf6qKSRi4Vha1fyYyjj45o1eqT01ZgaZQ==", "10a98115-58a8-4a9e-9acc-5f3b9919472f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "29a060c6-8963-44fe-89a6-9354df987209", "AQAAAAIAAYagAAAAEJmf/uLM2vScFc2fOmCCJIktm8YPcAdjN7seVIyJoMSTbqD08SfBuUnE2vCiD/Cfag==", "4088771b-17a0-4645-aeeb-0cde9e80adbc" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c96ba401-d746-467c-afe0-1a47d2ac0eff", "AQAAAAIAAYagAAAAEGx/+KU0o4IV0JokcuPK6uw1XDv7Yb1TGmRrA7bGEGPFYrRdoFfreOQgRZ4nJZeoSQ==", "0d6e7a3e-9c28-4cbc-8e9b-ed4532417020" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "036d2f83-9fc3-4758-9e90-de4476afe7cb", "AQAAAAIAAYagAAAAEDkmXn225ySnv+bzOQztglDuc48EFxe3Pq/XxcU3dt4Kf3v32mN3NWWX1sMF9GYTXA==", "cbefbe4d-662b-4ce9-973e-6a471eb52a91" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "392c6a47-48fe-481e-8437-fedc3087c90d", "AQAAAAIAAYagAAAAECXbyaPLV2FMj64w3OzBXJuMXO6cevFfR74UmpfGvTGzXp70cRnSCuD8XBi27uvEeQ==", "9d376435-739d-4399-a1a5-33fafe984ad2" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5d45fea1-eea3-4a8c-84cd-fbcde85787e8", "AQAAAAIAAYagAAAAEC0zCJGp1hrwGlOwVK5FJbBruzIKDpFX8qfAoeGySbWyXGR4g56w98t4CJwtU2noHw==", "bf9a0688-1f2c-4768-9599-99df81054712" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cdecaa77-5f37-42f3-bcb1-b8c972de0f39", "AQAAAAIAAYagAAAAEJbB8aoqHLm4IL9muXsg98XM1Hfble5WmRiX/W1ve850xxJfkrmD/+sbatZea3dlTg==", "977a929a-3779-41a6-98c0-699241c5fa8c" });

            migrationBuilder.InsertData(
                table: "StudentAnswers",
                columns: new[] { "StudentAnswerId", "QuestionId", "SubmissionId", "Value" },
                values: new object[,]
                {
                    { 1, 1, 1, "Answer 1" },
                    { 2, 2, 1, "Answer 3" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentSubmissions_AssignmentId",
                table: "AssignmentSubmissions",
                column: "AssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentSubmissions_StudentId",
                table: "AssignmentSubmissions",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAnswers_QuestionId",
                table: "StudentAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentAnswers_SubmissionId",
                table: "StudentAnswers",
                column: "SubmissionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentAnswers");

            migrationBuilder.DropTable(
                name: "AssignmentSubmissions");

            migrationBuilder.DropColumn(
                name: "CanRetry",
                table: "Assignments");

            migrationBuilder.DropColumn(
                name: "CanViewScore",
                table: "Assignments");

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
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(879), new DateTime(2024, 11, 30, 20, 1, 54, 681, DateTimeKind.Local).AddTicks(880) });

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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "779032ed-5b00-4d0e-ab16-59cc0396d111", "AQAAAAIAAYagAAAAEJlkWrq9LdQOS+O4/+9EoaleqJlAv1/mUIkOO5buuuSzhuMMVaGUc56/ITW+ep+kTg==", "df882d53-df7a-4ea2-9689-8392e7aaed3d" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "23bace04-4f85-43d1-9129-048ef766471a", "AQAAAAIAAYagAAAAEG1YsobPWIQ4EqkQHWQ3//Y2gJdn6nUEIWmue9+heNfsDeJepbiyycVfiAIHl5eG9g==", "7e94cfdd-d883-4fba-a58b-0b1fe3d10ee5" });
        }
    }
}
