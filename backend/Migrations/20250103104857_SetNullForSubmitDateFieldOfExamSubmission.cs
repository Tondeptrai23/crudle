using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class SetNullForSubmitDateFieldOfExamSubmission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_ExamId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "ExamId",
                table: "Questions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "SubmittedAt",
                table: "ExamSubmissions",
                type: "datetime(6)",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3200));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(2949), new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(2969) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(2972), new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(2972) });

            migrationBuilder.UpdateData(
                table: "AssignmentSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3309));

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3065), new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3066) });

            migrationBuilder.UpdateData(
                table: "ExamSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                columns: new[] { "StartedAt", "SubmittedAt" },
                values: new object[] { new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3454), new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3455) });

            migrationBuilder.UpdateData(
                table: "Exams",
                keyColumn: "ExamId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3390), new DateTime(2025, 1, 3, 17, 48, 56, 263, DateTimeKind.Local).AddTicks(3391) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1143154a-998e-4a44-b196-04b90c363a55", "AQAAAAIAAYagAAAAEIF3Z1PuVlxBgL0wskskLCFc2h00R/g71ArvXamLC9kP7S7IwmHFvzcwFV1SUQY1Cw==", "0414c6e0-dc6b-480c-86f7-f70edf864663" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e5e5d506-5d2e-459c-865f-8d6fdf052f09", "AQAAAAIAAYagAAAAEFq/+cXT3FxgncHh94bUzQWEw3MTWu3U5j+Soye7S4MAFrCYjAJVZtWxJfASyqCEXw==", "ffa4350c-c5ce-4671-aa01-48d8706b22f6" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f949019c-b29f-4838-9b19-7c561f87589e", "AQAAAAIAAYagAAAAEOYpmmGKfY+hWW4Puny470BUqgWgneq8aMpLTChshhkRo4Ii1n0sC21xJAiY/0GyMA==", "44f6fedb-f12b-44fb-bddf-2e46693d8871" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "bd84a741-629f-462f-b0bb-e643eceae3fa", "AQAAAAIAAYagAAAAEPg4JQ8+S3oh0kfCwI/YhjHRuoYTnWqEcUtRGxftPZ0thgerGt1A2nOG4cyZ8b9aMg==", "ab9cec50-118e-49ce-ac65-789ea0ce57c0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2cb94ed2-e8f2-4957-ab93-babdd0b2bf45", "AQAAAAIAAYagAAAAEHdjpTWHHyPG5EMh4/vZeRXGALa8SGr6yNIqytNQPtLC493wtG/uJOZIiZVXfT5/BQ==", "953ef4d4-5765-4b33-a287-de3e58773d9e" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fa033bac-bdec-4480-9734-e8b71cd34f72", "AQAAAAIAAYagAAAAENgeGB3UIfPuUDyLj5xEvzfX9lLIFCIap/Bn8a1CBs1WlLYnEJaobqPiBW55HGjRCA==", "7484cd91-cf55-4bad-ab90-97bc4ceb3924" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "64e34705-e4f4-4d9c-be6a-ca82f69d76f7", "AQAAAAIAAYagAAAAEGiPdj4dPLwcdt9U7zWhfGnndXca/x+CuzWiaPjA4hpxBpkB1Xu3cNVqRORFXazGsA==", "90754819-94b7-40c9-9897-4a9b59c929f0" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExamId",
                table: "Questions",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "SubmittedAt",
                table: "ExamSubmissions",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldNullable: true);

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

            migrationBuilder.UpdateData(
                table: "ExamSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                columns: new[] { "StartedAt", "SubmittedAt" },
                values: new object[] { new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9853), new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9855) });

            migrationBuilder.UpdateData(
                table: "Exams",
                keyColumn: "ExamId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9723), new DateTime(2024, 12, 30, 10, 15, 44, 383, DateTimeKind.Local).AddTicks(9725) });

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

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ExamId",
                table: "Questions",
                column: "ExamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Exams_ExamId",
                table: "Questions",
                column: "ExamId",
                principalTable: "Exams",
                principalColumn: "ExamId");
        }
    }
}
