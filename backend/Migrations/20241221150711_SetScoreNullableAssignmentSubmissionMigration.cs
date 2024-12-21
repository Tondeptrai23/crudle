using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class SetScoreNullableAssignmentSubmissionMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Score",
                table: "AssignmentSubmissions",
                type: "double",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double");

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
                columns: new[] { "Score", "SubmittedAt" },
                values: new object[] { null, new DateTime(2024, 12, 21, 22, 7, 10, 561, DateTimeKind.Local).AddTicks(2616) });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Score",
                table: "AssignmentSubmissions",
                type: "double",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "double",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2024, 12, 17, 16, 34, 55, 655, DateTimeKind.Local).AddTicks(9900));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 17, 16, 34, 55, 655, DateTimeKind.Local).AddTicks(9473), new DateTime(2024, 12, 17, 16, 34, 55, 655, DateTimeKind.Local).AddTicks(9496) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 17, 16, 34, 55, 655, DateTimeKind.Local).AddTicks(9502), new DateTime(2024, 12, 17, 16, 34, 55, 655, DateTimeKind.Local).AddTicks(9503) });

            migrationBuilder.UpdateData(
                table: "AssignmentSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                columns: new[] { "Score", "SubmittedAt" },
                values: new object[] { 0.0, new DateTime(2024, 12, 17, 16, 34, 55, 656, DateTimeKind.Local).AddTicks(58) });

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 17, 16, 34, 55, 655, DateTimeKind.Local).AddTicks(9665), new DateTime(2024, 12, 17, 16, 34, 55, 655, DateTimeKind.Local).AddTicks(9665) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2d7123f1-b94b-4e5a-934d-098a582b4250", "AQAAAAIAAYagAAAAEHV7znbxKvLyfic7DT2782EpL5ofZv9Kne6ytpdOIeVnA0i9xReOFv1CEhL8ObNIfg==", "be885677-fe67-4d2e-908a-53f20c08a043" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "32cd6b90-6306-4077-a320-b5ed35a4830f", "AQAAAAIAAYagAAAAEIrzrYSFTbgUUvGvIYC4uSw3m+OkfMxwfWgsT+WZwhwXpH6Jl+RV09pp7Hb98FzLZw==", "22c4560b-1c83-4add-b882-a52b16d3c858" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "94b35e8b-d6b7-4902-b91e-aeb6c7401a51", "AQAAAAIAAYagAAAAEFOguG9xQAI0/TqRGYmRoRSDPxlqEtH26XS3wqQRmoLdi82LTIbOE7xDUGoRLX7YZQ==", "602077eb-68ed-4cea-952c-82d99193d262" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ab9ca763-cf4a-4a4a-a0f6-39fb14a5eb9a", "AQAAAAIAAYagAAAAEEDj5uZrJBFsEArjt2zG7QEmNCs4PO/chaFuqwCDtCrTIyKvaRXZbu6tJI0b3xHHLw==", "da73649d-790f-496e-a5ba-303fc0cf0013" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "afe1b346-0d19-4825-bc8b-4675e8f0a295", "AQAAAAIAAYagAAAAEGowss1aKbztgY6/ZKeU6WIIUDJQ4n4bFr9aCqvfctSasy+ioHzeoYmoS1m05L4hPw==", "61ee180c-7e5f-49a8-a585-cba71b077029" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "339389ab-f000-49f6-8269-175559f89289", "AQAAAAIAAYagAAAAENGbnEBy5YnTzAmgl34AeVdSYCwz77392tDknR6bUVAhVG+su5xtkiFiedJUDIJYwA==", "0a03e84c-6f9d-465e-8fa4-b637e5a05c1f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "3d8f0aa0-c5fb-4fde-ad3a-b378f3e0b30f", "AQAAAAIAAYagAAAAEOvcsdCbXL4xxeKaDJBxSbbKS6rx8QUH7Mgtrygsn6F88k7IQr4A+xoxB0yBCfFEYg==", "a5f52987-7a02-4607-9898-f92865942cbf" });
        }
    }
}
