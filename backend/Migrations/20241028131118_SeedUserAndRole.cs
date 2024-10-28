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
                    { "00000000-0000-0000-0000-000000000001", 0, "63bb8650-6ef7-41cc-8b82-47ba1e421a55", "test1@example.com", false, false, null, "TEST1@EXAMPLE.COM", "USER1", "AQAAAAIAAYagAAAAEJfgE8wtZOcNZvN2I86dayKa87Qa2yW5A9dCvhKQS08q9JG26X+fYWj5hXtqLLum6A==", null, false, "28aeb90f-1a72-41ed-8220-3e7360f6c0d4", false, "user1" },
                    { "00000000-0000-0000-0000-000000000002", 0, "26d0d788-a99e-4bee-954f-3845c2736826", "test2@example.com", false, false, null, "TEST2@EXAMPLE.COM", "USER2", "AQAAAAIAAYagAAAAEHGd1iAjZ+fecapvmtqk4TATAwn1Iq4IKIjFdA+fvC6yTgtOt5f6iAFDVDBP4N09Ng==", null, false, "829165c3-82e0-4df2-b5b6-2c8bf15188af", false, "user2" },
                    { "00000000-0000-0000-0000-000000000003", 0, "57c6adf2-f274-4055-8765-221a9cf3f141", "test3@example.com", false, false, null, "TEST3@EXAMPLE.COM", "USER3", "AQAAAAIAAYagAAAAEBY19+H02X3daUOz1LsL3DH/Deze9yXsYrzM6/ILJ2KToIS+uk+9MHEa9dDGBdBqdg==", null, false, "a5f7c5c3-60f9-46cc-862b-08f3a40e361d", false, "user3" },
                    { "00000000-0000-0000-0000-000000000004", 0, "4f49a216-4e2c-47f3-b689-dcb451876a3c", "test4@example.com", false, false, null, "TEST4@EXAMPLE.COM", "USER4", "AQAAAAIAAYagAAAAEI6AGqRPYO3p0Zyzb0rBJesix0OB51ZPHjqb+ziUgFpxoDSBH+Mp/4iUxVJq5CceBg==", null, false, "e3dc78c8-24cb-4fd4-9bd8-6ccc19a0957f", false, "user4" },
                    { "00000000-0000-0000-0000-000000000005", 0, "1217c129-6153-46ee-829f-5e3dad6f98d2", "admin@gmail.com", false, false, null, "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEIVW4wKvMbV4PZVEi4iua74Ub7ET79H/saQurY4IYBzFg/vj+bfjJEhczpjhf/saPg==", null, false, "c2b67540-bb58-4318-a5e2-beb3f3f641d0", false, "admin" }
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
