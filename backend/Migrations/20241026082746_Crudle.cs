using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _3w1m.Migrations
{
    /// <inheritdoc />
    public partial class Crudle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e71421f0-95e7-4f09-ad32-eb1674649ab7", "AQAAAAIAAYagAAAAEOj5ZlEmGN8Hhc7o9vqczHDD4GaExsqai8Il30ez7VZziUgoqEx3ZYUk1eXzHMjVNw==", "042f771f-fdf5-4f78-90e5-9b305044e94f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2ee96ebc-5a89-4a06-874d-79b96d14cbf6", "AQAAAAIAAYagAAAAEOdtxc28A1865q3HCsLKIo2/HliIXH5T8e/L5Yy+i/yN1GY1/Fqfgqmr228fzCqBBA==", "c7294516-9020-4bf2-9949-97efb3aa4c64" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b7b67df9-da75-4d16-a3dc-6c1d397f745c", "AQAAAAIAAYagAAAAEEZ8QOqfiBwi23qyp/qE0D6BY6Kw1hXZMEi6G745FNdl5asOowiC3FoMDgUALBQsqA==", "64d23c91-79fb-4b79-8370-677330fe47c0" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b6d5b051-02ff-4c00-a2a5-82a95a5e6cd2", "AQAAAAIAAYagAAAAEKGqUVi9GRyKmflcbDSS1VWGzUL8flWKCIRvHC8iF9eaxooDOoAQXK8Xn90csLQniw==", "98b6ff05-bedf-479e-adbd-724121b1a39f" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ead9f2cd-2b46-400a-b442-49c02eda83e8", "AQAAAAIAAYagAAAAEFDdVZ3VJ1i1XdAmUC+WZIJfCBA5wHimWYZLXaeNodOZ+/POTM6ZJDlNRx3yKxRrqg==", "c54c5e15-68ea-4796-8edf-3db425a2e2c8" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000001",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b52327e6-99c5-4c73-9fea-37c70e91b0d6", "AQAAAAIAAYagAAAAEGY3/jZPdjlC+0rif/x/salz0lWRZBXJGex9R1lmfw/x6/KDyo51/MGMiDHVsBNspA==", "c8d14d8c-ddd4-49f7-a951-5677be83f870" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000002",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "83b0cab4-4b16-4ae4-9dcf-21aa0e59f3a0", "AQAAAAIAAYagAAAAEPYKyiY4T5h752hDr1DK7BCSjaskWJIqFBHKXsszNCNV6sjpwQKGeqTRHT75v8xF9g==", "cd0ee10d-2324-4f43-bcd2-39de4b4527d9" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000003",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fa61edd6-1808-4c88-afa1-18e0d55819fa", "AQAAAAIAAYagAAAAENSoMck5X7KdIbHJLBVerojHApoSzsRLV0DjNRmU58GJEDy2kO8Xj0332+/G+wrYgw==", "9bde5fb3-71fa-4784-adf7-490057fb6129" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000004",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "7b677eb9-6196-48d5-bfd1-7959609a7279", "AQAAAAIAAYagAAAAELkuBKy/ahdaKTv7/i28NZk9aN5U4Iwy67azZAGLmI2enPVoBNrVTDvlSDlW3RqgyQ==", "b4340262-c812-4664-851b-385b4e6bdb43" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: "00000000-0000-0000-0000-000000000005",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "caa60800-7b3f-4bf4-9009-341551e03cb4", "AQAAAAIAAYagAAAAEMvT1+WKmOwQy8Brm7twgtVNMjI1TTfcGz7XM4IcC1bP6d1dfOuwXO59W4amz11V7Q==", "7b762730-d6ae-4e02-99ce-73e3dac979f0" });
        }
    }
}
