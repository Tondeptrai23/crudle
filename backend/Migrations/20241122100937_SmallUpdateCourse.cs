using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class SmallUpdateCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Teachers_TeacherId",
                table: "Courses");

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "Courses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5fe77981-c9b7-4e8c-90eb-3b2c9fe6e685", "AQAAAAIAAYagAAAAEKWMlU54x1ronJr3E+J/gmGkl8ociiL2a0eDOcjNPqy8Cz+pmH4cYGULlQVCLpsMXQ==", "be40550b-1642-44ea-89fe-eea58413d6d0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3965924b-2149-4257-a6eb-18f1e2f5b62d", "AQAAAAIAAYagAAAAENdJXydngulGyhCzSfNC8HHTErD9vIE1cNubp8VRfLAzljnW9VNEEgP/+rI276B7Og==", "92b8316c-7259-4ac2-8165-151d438d04fd" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6e2ef046-2aa0-4ca8-af65-9c9c9583825c", "AQAAAAIAAYagAAAAEHIud2KR98Hz+Mvyd60aTT+QLaT1pqohjAGtG6rDWYGPot5h+JdF/z/wobbO6Vv/Zw==", "692b40a0-bfa5-4193-9fd4-f3d2afb17b72" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "209cf6c0-8945-4c7f-bc5f-420e7a97f6ff", "AQAAAAIAAYagAAAAEOQoo/LwVmRrwr0uxXnVO0uLvth/9hxu8wXKIaidmmGZPxUFhUsoU71BSzIfTOTOoQ==", "aff9bf61-8b80-480a-8b02-0ff640ebfe21" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dca81373-ca5a-4af4-af09-b41a18074bf5", "AQAAAAIAAYagAAAAEN6mCuYt95cwlf8r+G2vWdAS5xHCehn3p+KHNde0LfgZDlWf8EUiwiPT28dGjc+9DQ==", "63206b2a-c3a2-4f53-b103-c60cace80625" });

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Teachers_TeacherId",
                table: "Courses",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Teachers_TeacherId",
                table: "Courses");

            migrationBuilder.AlterColumn<int>(
                name: "TeacherId",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "63bb8650-6ef7-41cc-8b82-47ba1e421a55", "AQAAAAIAAYagAAAAEJfgE8wtZOcNZvN2I86dayKa87Qa2yW5A9dCvhKQS08q9JG26X+fYWj5hXtqLLum6A==", "28aeb90f-1a72-41ed-8220-3e7360f6c0d4" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "26d0d788-a99e-4bee-954f-3845c2736826", "AQAAAAIAAYagAAAAEHGd1iAjZ+fecapvmtqk4TATAwn1Iq4IKIjFdA+fvC6yTgtOt5f6iAFDVDBP4N09Ng==", "829165c3-82e0-4df2-b5b6-2c8bf15188af" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "57c6adf2-f274-4055-8765-221a9cf3f141", "AQAAAAIAAYagAAAAEBY19+H02X3daUOz1LsL3DH/Deze9yXsYrzM6/ILJ2KToIS+uk+9MHEa9dDGBdBqdg==", "a5f7c5c3-60f9-46cc-862b-08f3a40e361d" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4f49a216-4e2c-47f3-b689-dcb451876a3c", "AQAAAAIAAYagAAAAEI6AGqRPYO3p0Zyzb0rBJesix0OB51ZPHjqb+ziUgFpxoDSBH+Mp/4iUxVJq5CceBg==", "e3dc78c8-24cb-4fd4-9bd8-6ccc19a0957f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1217c129-6153-46ee-829f-5e3dad6f98d2", "AQAAAAIAAYagAAAAEIVW4wKvMbV4PZVEi4iua74Ub7ET79H/saQurY4IYBzFg/vj+bfjJEhczpjhf/saPg==", "c2b67540-bb58-4318-a5e2-beb3f3f641d0" });

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Teachers_TeacherId",
                table: "Courses",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
