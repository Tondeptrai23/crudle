using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class SmallFixQuestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Questions",
                newName: "Content");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Questions",
                newName: "Name");

            migrationBuilder.UpdateData(
                table: "ArticleProgresses",
                keyColumn: "ArticleProgressId",
                keyValue: 1,
                column: "ReadAt",
                value: new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6347));

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5947), new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5969) });

            migrationBuilder.UpdateData(
                table: "Articles",
                keyColumn: "ArticleId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5976), new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(5976) });

            migrationBuilder.UpdateData(
                table: "AssignmentSubmissions",
                keyColumn: "SubmissionId",
                keyValue: 1,
                column: "SubmittedAt",
                value: new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6488));

            migrationBuilder.UpdateData(
                table: "Assignments",
                keyColumn: "AssignmentId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6139), new DateTime(2024, 12, 2, 16, 3, 25, 353, DateTimeKind.Local).AddTicks(6140) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "dbf4ead6-888b-403a-8151-e8eae6f4f99d", "AQAAAAIAAYagAAAAEGfDuNni6jWRzpt+WpLJ4UMLwm7LxpM7sBf6qKSRi4Vha1fyYyjj45o1eqT01ZgaZQ==", "10a98115-58a8-4a9e-9acc-5f3b9919472f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "29a060c6-8963-44fe-89a6-9354df987209", "AQAAAAIAAYagAAAAEJmf/uLM2vScFc2fOmCCJIktm8YPcAdjN7seVIyJoMSTbqD08SfBuUnE2vCiD/Cfag==", "4088771b-17a0-4645-aeeb-0cde9e80adbc" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c96ba401-d746-467c-afe0-1a47d2ac0eff", "AQAAAAIAAYagAAAAEGx/+KU0o4IV0JokcuPK6uw1XDv7Yb1TGmRrA7bGEGPFYrRdoFfreOQgRZ4nJZeoSQ==", "0d6e7a3e-9c28-4cbc-8e9b-ed4532417020" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "036d2f83-9fc3-4758-9e90-de4476afe7cb", "AQAAAAIAAYagAAAAEDkmXn225ySnv+bzOQztglDuc48EFxe3Pq/XxcU3dt4Kf3v32mN3NWWX1sMF9GYTXA==", "cbefbe4d-662b-4ce9-973e-6a471eb52a91" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "392c6a47-48fe-481e-8437-fedc3087c90d", "AQAAAAIAAYagAAAAECXbyaPLV2FMj64w3OzBXJuMXO6cevFfR74UmpfGvTGzXp70cRnSCuD8XBi27uvEeQ==", "9d376435-739d-4399-a1a5-33fafe984ad2" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000006",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5d45fea1-eea3-4a8c-84cd-fbcde85787e8", "AQAAAAIAAYagAAAAEC0zCJGp1hrwGlOwVK5FJbBruzIKDpFX8qfAoeGySbWyXGR4g56w98t4CJwtU2noHw==", "bf9a0688-1f2c-4768-9599-99df81054712" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000007",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cdecaa77-5f37-42f3-bcb1-b8c972de0f39", "AQAAAAIAAYagAAAAEJbB8aoqHLm4IL9muXsg98XM1Hfble5WmRiX/W1ve850xxJfkrmD/+sbatZea3dlTg==", "977a929a-3779-41a6-98c0-699241c5fa8c" });
        }
    }
}
