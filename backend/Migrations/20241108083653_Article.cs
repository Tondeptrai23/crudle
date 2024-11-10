using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class Article : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dae78596-60c5-4795-994d-03ecb8a73a24", "TEST1@EXAMPLE.COM", "USER1", "AQAAAAIAAYagAAAAEFpbqNbzIbKJpF7J3WxG/uNNFRtbS5a+c3AYohhWXaBRe0jODIRrnQp9qC166F8H7Q==", "276d71fd-4c85-4806-98d3-18ce58e5d445" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0a6b7365-e3fb-45ac-acd8-94a91e769aa3", "TEST2@EXAMPLE.COM", "USER2", "AQAAAAIAAYagAAAAEK/SV4NY2fb1PmVqDmKsTEyUlOG+8/iovNccSVtVjf+HPTZ3kOmzUwULbYvRK+BaFw==", "188509a8-d3d9-4c7f-ae30-1ab7df430061" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c082cee3-7bfc-4cf7-8893-bba213885efd", "TEST3@EXAMPLE.COM", "USER3", "AQAAAAIAAYagAAAAEEqVmnDElG8fONIbYevXAStmMKx2eBtcENeFLSH4/gjii4n3+lHkLUwDls+wpQ09Nw==", "8b91ee80-646e-4435-b49a-af5dcb25c3d0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "174a286d-04cc-4543-9b12-edbeea4ba64f", "TEST4@EXAMPLE.COM", "USER4", "AQAAAAIAAYagAAAAEGC09p1HGaGn72gnqIkfzBt9ucT3S8/SYeqGq1XmrLCr2w71ozs51LGah1YqQ9nYXg==", "892cee70-c2d6-4175-839c-89892de9b552" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "96c9f9d5-346f-4d71-ad11-77975193aacc", "ADMIN@EXAMPLE.COM", "ADMIN", "AQAAAAIAAYagAAAAEOCrC4C/AyiT7NhqvxLAExZdpnicDk0yGLgB1ieGYGd2yz7loTPIPg70r0L9NkvQ/A==", "a315f4e7-b030-42ff-a3a7-550412efb12d" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 7, 21, 5, 18, 131, DateTimeKind.Local).AddTicks(2176), new DateTime(2024, 11, 7, 21, 5, 18, 131, DateTimeKind.Local).AddTicks(2196) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 7, 21, 5, 18, 131, DateTimeKind.Local).AddTicks(2203), new DateTime(2024, 11, 7, 21, 5, 18, 131, DateTimeKind.Local).AddTicks(2204) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b8657f5a-ac74-48de-b3be-412547deda11", null, null, "AQAAAAIAAYagAAAAEGLTXpfYXKwzUP38w7oqjJIIY6PS5/sPDqoAgWYjSapa16xs9pmyBVUQOMMvVdmsPA==", "5dcb5a24-994d-4ce0-8023-5ce6dc38b38b" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "50c2f202-7e08-4e47-bbf4-4802c55f5c17", null, null, "AQAAAAIAAYagAAAAEPs39bOTgaDZlzfZwt8sZcdrhOxfmNuMXEIrbCKDZR51EDOzJSeTXZDXFZyKKlPExg==", "d4767b10-c710-4299-a41d-aba84e5321d9" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "572bcb82-b51e-41fb-8cf7-c63b68c1c5f4", null, null, "AQAAAAIAAYagAAAAEBhasdB8waFVIBEAi4XTpse/uqWYGtDqIP2L1VKU4vrPq9Yd3gcIwChclEIpGK8XIw==", "f943f2f7-d203-434f-b3ad-0b9a3ef04daa" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9374b053-6100-44d2-84e4-ce1a3ecf5e5f", null, null, "AQAAAAIAAYagAAAAEAH2MTQDEu56rRPINDby9seJuG/KzvosTxmKohihUhJorottY7iefjmCVI1624lQzg==", "79256cc8-c32a-4681-a69b-36face499713" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "SecurityStamp" },
                values: new object[] { "303e6435-ecc5-4dcf-bb29-695cb2aa6c2a", null, null, "AQAAAAIAAYagAAAAEPO+v3mHSOe/oK63tLulBlR0XhyUjnGGut203EsrPVQGBdg8BEUa8zOON20CcnaLQg==", "86c973f6-0c28-479e-93da-ce140fcffe51" });
        }
    }
}
