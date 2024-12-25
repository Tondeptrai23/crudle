using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class AddStartedAtFieldForSubmission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "StartedAt",
                table: "AssignmentSubmissions",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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
                columns: new[] { "StartedAt", "SubmittedAt" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 12, 17, 16, 34, 55, 656, DateTimeKind.Local).AddTicks(58) });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartedAt",
                table: "AssignmentSubmissions");

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2024, 12, 16, 15, 41, 39, 682, DateTimeKind.Local).AddTicks(9909));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 16, 15, 41, 39, 682, DateTimeKind.Local).AddTicks(9213), new DateTime(2024, 12, 16, 15, 41, 39, 682, DateTimeKind.Local).AddTicks(9240) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 16, 15, 41, 39, 682, DateTimeKind.Local).AddTicks(9246), new DateTime(2024, 12, 16, 15, 41, 39, 682, DateTimeKind.Local).AddTicks(9246) });

            migrationBuilder.UpdateData(
                table: "AssignmentSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2024, 12, 16, 15, 41, 39, 683, DateTimeKind.Local).AddTicks(60));

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 16, 15, 41, 39, 682, DateTimeKind.Local).AddTicks(9406), new DateTime(2024, 12, 16, 15, 41, 39, 682, DateTimeKind.Local).AddTicks(9407) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "caba78ba-55f7-4003-a444-8822b82369a9", "AQAAAAIAAYagAAAAEGFRnZYn9fpRp8ydnyc7jY7cgckcMPb2ClOy0R4zGBmLSw5PD+l8E/K+5sYIeVAk9A==", "3a48bb97-3882-4fa6-abd9-d37312344fd0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "88caca5f-f48a-48eb-bc7d-e057d444f177", "AQAAAAIAAYagAAAAEHn39L6/xaYHtU3lAQ/Rmr5sF5Thizb+1jaE+g1oZffhJFMyxk7llol0ayhovDVIuw==", "9dd9c487-2ebc-4504-bcb7-a61bfa1a2099" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f5fb6926-e03c-4c69-8d79-2921c40eaf0f", "AQAAAAIAAYagAAAAEE9y7AvQL2vnPNSW4PXShtPpZqIr5TYvKBuYCdWF3DVR6HHNAe+xMMqZT8UG1OVBeg==", "e201776e-30e7-4191-b10f-43ef9fa7d4a6" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9638b21c-6c35-424f-96fd-5ac22be0b8c6", "AQAAAAIAAYagAAAAEAl3xzJrs2yGRIsqHiCwOMOhts077haeE+pLeAQ4rNGFUeJy7xQu6iU3Svecsf7UIg==", "3e7735a9-a3d8-4ee2-9ec1-9d1b00554c03" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4b14024a-a68c-49e8-a638-66ca9a3584ba", "AQAAAAIAAYagAAAAEPM2BWMozno9ZYfBOz+DNfzgSgzcary9KRu/PkF+Rp+J9rWyd5eh61hnENmaWlvVSA==", "a1aeef5d-0371-4a91-9ad4-a67558dd73c0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "a9cc0d93-f4ab-4e70-a56d-5a158497cec4", "AQAAAAIAAYagAAAAENKAwiYIMcZ3IdIP2QnLjcEFmcZSfWZp8pMzpmER3iG8owjhZTLHEN+BcZo25VzH/g==", "b9112d37-1041-4edf-a96a-2c9733253db0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9c232e67-c465-4c92-b74c-0a571b676638", "AQAAAAIAAYagAAAAEJXL2qz1olh8MLnTUkyUc0D22qIjyYux8I4vr1phzRfp/CbrDarOEWjPyfmtZFWbwQ==", "48c32818-2d12-4145-9008-e182c2350799" });
        }
    }
}
