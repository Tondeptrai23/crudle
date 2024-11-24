using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class ArticleProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArticleProgresses",
                columns: table => new
                {
                    ArticleProgressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ArticleId = table.Column<int>(type: "int", nullable: false),
                    StudentId = table.Column<int>(type: "int", nullable: false),
                    IsDone = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleProgresses", x => x.ArticleProgressId);
                    table.ForeignKey(
                        name: "FK_ArticleProgresses_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "ArticleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArticleProgresses_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "StudentId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "ArticleProgresses",
                columns: new[] { "ArticleProgressId", "ArticleId", "IsDone", "StudentId" },
                values: new object[] { 1, 1, true, 1 });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 24, 8, 47, 16, 995, DateTimeKind.Local).AddTicks(7330), new DateTime(2024, 11, 24, 8, 47, 16, 995, DateTimeKind.Local).AddTicks(7348) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 24, 8, 47, 16, 995, DateTimeKind.Local).AddTicks(7350), new DateTime(2024, 11, 24, 8, 47, 16, 995, DateTimeKind.Local).AddTicks(7351) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e5a2deed-e0d6-409b-b0f5-5cea65622a3f", "AQAAAAIAAYagAAAAEIH4nXOr/txslV1MmS4tUmPgxXlL3tv0vxC1ZNAqp6l89cexqs3OFR0KlsbwnSwsDA==", "1685fd88-0a83-4061-8fa1-b37a7c1e30be" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a88bb5d2-8136-4710-8193-1b7112b9c439", "AQAAAAIAAYagAAAAEAhJ1chpy2LfzwJocoEb6nKL6a9JMsMwji9tbzhv2kI0KAIE4nZK2V/ntqHCQbZj3Q==", "6b3f9b2b-e669-4ccc-9e88-95ef8533a803" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "020b11db-b5e5-4c4b-bbfc-48766cae05eb", "AQAAAAIAAYagAAAAEIifk6zmEycpYnwEWQ3dpZGGFJXMvqQSs3hSVcZhLuAcbIMfC5tNMK5eeT/11ZdRYw==", "fd50b787-20d6-4893-b44a-25982ab92567" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6bf807c2-bfb6-44f2-874e-238c4e913307", "AQAAAAIAAYagAAAAEIu2zhL6za/HwIf8MaydI7n/E7lp/pe+e9mAx5owQGiu88aSvb5uplAmhEgd50PY1w==", "40ef33a3-804e-44b8-b241-a90125d207b6" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "170c2ff8-fd04-4d5f-aab3-db0b42d640c3", "AQAAAAIAAYagAAAAENBHf5H3xxpLoNyfkP/mCLiTgXAFyN6x6CEf9sd0xpoidsl6GWMsbVtzlS/VvyUMaQ==", "7867f499-1560-4c29-9bd4-22e371c2fe20" });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleProgresses_ArticleId",
                table: "ArticleProgresses",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_ArticleProgresses_StudentId",
                table: "ArticleProgresses",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArticleProgresses");

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 8, 15, 36, 53, 75, DateTimeKind.Local).AddTicks(6058), new DateTime(2024, 11, 8, 15, 36, 53, 75, DateTimeKind.Local).AddTicks(6088) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 8, 15, 36, 53, 75, DateTimeKind.Local).AddTicks(6093), new DateTime(2024, 11, 8, 15, 36, 53, 75, DateTimeKind.Local).AddTicks(6094) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dae78596-60c5-4795-994d-03ecb8a73a24", "AQAAAAIAAYagAAAAEFpbqNbzIbKJpF7J3WxG/uNNFRtbS5a+c3AYohhWXaBRe0jODIRrnQp9qC166F8H7Q==", "276d71fd-4c85-4806-98d3-18ce58e5d445" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0a6b7365-e3fb-45ac-acd8-94a91e769aa3", "AQAAAAIAAYagAAAAEK/SV4NY2fb1PmVqDmKsTEyUlOG+8/iovNccSVtVjf+HPTZ3kOmzUwULbYvRK+BaFw==", "188509a8-d3d9-4c7f-ae30-1ab7df430061" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c082cee3-7bfc-4cf7-8893-bba213885efd", "AQAAAAIAAYagAAAAEEqVmnDElG8fONIbYevXAStmMKx2eBtcENeFLSH4/gjii4n3+lHkLUwDls+wpQ09Nw==", "8b91ee80-646e-4435-b49a-af5dcb25c3d0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "174a286d-04cc-4543-9b12-edbeea4ba64f", "AQAAAAIAAYagAAAAEGC09p1HGaGn72gnqIkfzBt9ucT3S8/SYeqGq1XmrLCr2w71ozs51LGah1YqQ9nYXg==", "892cee70-c2d6-4175-839c-89892de9b552" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "96c9f9d5-346f-4d71-ad11-77975193aacc", "AQAAAAIAAYagAAAAEOCrC4C/AyiT7NhqvxLAExZdpnicDk0yGLgB1ieGYGd2yz7loTPIPg70r0L9NkvQ/A==", "a315f4e7-b030-42ff-a3a7-550412efb12d" });
        }
    }
}
