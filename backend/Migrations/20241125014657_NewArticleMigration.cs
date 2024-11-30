using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class NewArticleMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDone",
                table: "ArticleProgresses");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReadAt",
                table: "ArticleProgresses",
                type: "datetime(6)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReadAt",
                table: "ArticleProgresses");

            migrationBuilder.AddColumn<bool>(
                name: "IsDone",
                table: "ArticleProgresses",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "IsDone",
                value: true);

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 24, 11, 52, 43, 799, DateTimeKind.Local).AddTicks(6161), new DateTime(2024, 11, 24, 11, 52, 43, 799, DateTimeKind.Local).AddTicks(6184) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 11, 24, 11, 52, 43, 799, DateTimeKind.Local).AddTicks(6191), new DateTime(2024, 11, 24, 11, 52, 43, 799, DateTimeKind.Local).AddTicks(6192) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4bdfd4a3-612b-4361-85b6-4b1c6bd0020a", "AQAAAAIAAYagAAAAEEwWM7JI68oZTOw8CPvw6JIZqHm4PyDUlHAmgD0+E2BYZOjehHKiUMGMjUavqUFa7g==", "d61555cf-680d-4d1b-8934-c44e6dd7848f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "88989922-ce7e-4cec-b68e-c5839309726f", "AQAAAAIAAYagAAAAEHymvmqDhRdIDLo4CGsYclMncxdqmDvJ3x23bqzZEuyVzJSHyhATCwN/sLO18q7V1A==", "c71c1c0a-02e1-44e5-b8cd-9d5a7dd35a6f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "906beef3-7032-4e84-86b0-9ba9fe198fb9", "AQAAAAIAAYagAAAAECav03RBEgJLf59hpk1Ge/ZieUJWANW5ti2PBau+3+JadfCo+oxpA84NfvjIzA8QAg==", "cf1f1b74-ac9f-46d7-8dad-72a29268e531" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6e9f8106-8fb7-4062-b70a-4203d3e0e4fb", "AQAAAAIAAYagAAAAEC5wrgq6w6jSSRTcV3FfIpSnHLfzLL4iPWjhiILnQNWNN2yvDdg3F+X2Baa7hdJrLA==", "a460eb59-b568-4ccb-99e4-8c1d2a549d31" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2b4d861d-96f8-45fc-845e-03d7b51ef1e5", "AQAAAAIAAYagAAAAEGRpLiCTdUp9hPVRp0PaRpDKbl8TFTEexIKFF0LC1s22WfP4RCPstnusg0WlbIIArw==", "16d4b2cc-cf4e-46f0-805b-36c437cbab03" });
        }
    }
}
