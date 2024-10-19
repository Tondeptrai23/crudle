using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class AddUserSampleData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "00000004-0000-0000-0000-000000000000", 0, "2c362871-1106-41e8-a2e7-a8d6bc98460a", "test1@example.com", false, false, null, "TEST1@EXAMPLE.COM", "USER1", "AQAAAAIAAYagAAAAED9zmti95ILQjN8oElpmrsveI6I+wIWEfm5yA7EsGfTXJC1OXCGXwf98D2e+khu8Kg==", null, false, "99b162f3-0293-46ea-b2e3-068e6262217c", false, "user1" },
                    { "00000005-0000-0000-0000-000000000000", 0, "e0bf716a-005a-43b7-b439-8e8ffb255e4f", "test2@example.com", false, false, null, "TEST2@EXAMPLE.COM", "USER2", "AQAAAAIAAYagAAAAEI77tfx5yiTlRUcOjHH/Ct6AuDo0tJ3uLcBRkLZ6wrUqmK+icQzlfUInoFgVAnvaHw==", null, false, "dea14b77-2ba5-46b5-b229-fcf19a77cd3f", false, "user2" },
                    { "00000006-0000-0000-0000-000000000000", 0, "90f6ed37-317d-4157-93d9-456ffa4b2a7c", "test3@example.com", false, false, null, "TEST3@EXAMPLE.COM", "USER3", "AQAAAAIAAYagAAAAEOBSOz8SZS6S5e/96BXt9oue2Ix5P4+tdhAQMnRY3QVp2eFsF3kVZgVnY+gNuZAWJQ==", null, false, "bcb920c1-dbdd-4f46-914a-206541405e6f", false, "user3" },
                    { "00000007-0000-0000-0000-000000000000", 0, "bda8744a-fb80-4d05-991a-0a60e99088e4", "test4@example.com", false, false, null, "TEST4@EXAMPLE.COM", "USER4", "AQAAAAIAAYagAAAAEDrOItjDMLHpYOd7PZHldgBBPHQpdFJWR6XTAj3P+HeA8mbY8avXNXNsw2y+9JPvAQ==", null, false, "581c9100-8c1c-4cd1-8322-ab20dfc3403e", false, "user4" }
                });

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "UserId",
                value: "00000005-0000-0000-0000-000000000000");

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "UserId",
                value: "00000006-0000-0000-0000-000000000000");

            migrationBuilder.UpdateData(
                table: "Teachers",
                keyColumn: "TeacherId",
                keyValue: 1,
                column: "UserId",
                value: "00000004-0000-0000-0000-000000000000");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000004-0000-0000-0000-000000000000");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000005-0000-0000-0000-000000000000");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000006-0000-0000-0000-000000000000");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000007-0000-0000-0000-000000000000");

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "UserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "UserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Teachers",
                keyColumn: "TeacherId",
                keyValue: 1,
                column: "UserId",
                value: null);
        }
    }
}
