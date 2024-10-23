using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class SeedUserAndRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Users_UserId",
                table: "Teachers");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", null, "Admin", "ADMIN" },
                    { "2", null, "Teacher", "TEACHER" },
                    { "3", null, "Student", "STUDENT" }
                });

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "UserId",
                value: "00000000-0000-0000-0000-000000000002");

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "UserId",
                value: "00000000-0000-0000-0000-000000000003");

            migrationBuilder.UpdateData(
                table: "Teachers",
                keyColumn: "TeacherId",
                keyValue: 1,
                column: "UserId",
                value: "00000000-0000-0000-0000-000000000001");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "00000000-0000-0000-0000-000000000001", 0, "b52327e6-99c5-4c73-9fea-37c70e91b0d6", "test1@example.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEGY3/jZPdjlC+0rif/x/salz0lWRZBXJGex9R1lmfw/x6/KDyo51/MGMiDHVsBNspA==", null, false, "c8d14d8c-ddd4-49f7-a951-5677be83f870", false, "user1" },
                    { "00000000-0000-0000-0000-000000000002", 0, "83b0cab4-4b16-4ae4-9dcf-21aa0e59f3a0", "test2@example.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEPYKyiY4T5h752hDr1DK7BCSjaskWJIqFBHKXsszNCNV6sjpwQKGeqTRHT75v8xF9g==", null, false, "cd0ee10d-2324-4f43-bcd2-39de4b4527d9", false, "user2" },
                    { "00000000-0000-0000-0000-000000000003", 0, "fa61edd6-1808-4c88-afa1-18e0d55819fa", "test3@example.com", false, false, null, null, null, "AQAAAAIAAYagAAAAENSoMck5X7KdIbHJLBVerojHApoSzsRLV0DjNRmU58GJEDy2kO8Xj0332+/G+wrYgw==", null, false, "9bde5fb3-71fa-4784-adf7-490057fb6129", false, "user3" },
                    { "00000000-0000-0000-0000-000000000004", 0, "7b677eb9-6196-48d5-bfd1-7959609a7279", "test4@example.com", false, false, null, null, null, "AQAAAAIAAYagAAAAELkuBKy/ahdaKTv7/i28NZk9aN5U4Iwy67azZAGLmI2enPVoBNrVTDvlSDlW3RqgyQ==", null, false, "b4340262-c812-4664-851b-385b4e6bdb43", false, "user4" },
                    { "00000000-0000-0000-0000-000000000005", 0, "caa60800-7b3f-4bf4-9009-341551e03cb4", "admin@gmail.com", false, false, null, null, null, "AQAAAAIAAYagAAAAEMvT1+WKmOwQy8Brm7twgtVNMjI1TTfcGz7XM4IcC1bP6d1dfOuwXO59W4amz11V7Q==", null, false, "7b762730-d6ae-4e02-99ce-73e3dac979f0", false, "admin" }
                });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "2", "00000000-0000-0000-0000-000000000001" },
                    { "3", "00000000-0000-0000-0000-000000000002" },
                    { "3", "00000000-0000-0000-0000-000000000003" },
                    { "1", "00000000-0000-0000-0000-000000000005" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Users_UserId",
                table: "Teachers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students");

            migrationBuilder.DropForeignKey(
                name: "FK_Teachers_Users_UserId",
                table: "Teachers");

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "2", "00000000-0000-0000-0000-000000000001" });

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "3", "00000000-0000-0000-0000-000000000002" });

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "3", "00000000-0000-0000-0000-000000000003" });

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "00000000-0000-0000-0000-000000000005" });

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Users_UserId",
                table: "Students",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Users_UserId",
                table: "Teachers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
