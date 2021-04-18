using Microsoft.EntityFrameworkCore.Migrations;

namespace IlviraAPI.Migrations
{
    public partial class Secondcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DessetItemPrice",
                table: "OrderDetail");

            migrationBuilder.AlterColumn<decimal>(
                name: "GTotal",
                table: "OrderMaster",
                type: "decimal(10,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<decimal>(
                name: "DessertItemPrice",
                table: "OrderDetail",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DessertItemPrice",
                table: "OrderDetail");

            migrationBuilder.AlterColumn<decimal>(
                name: "GTotal",
                table: "OrderMaster",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10,2)");

            migrationBuilder.AddColumn<decimal>(
                name: "DessetItemPrice",
                table: "OrderDetail",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
