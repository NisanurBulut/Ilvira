using Microsoft.EntityFrameworkCore.Migrations;

namespace IlviraAPI.Migrations
{
    public partial class insert_column_imageUrl_DesertItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "tDessert",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "tDessert");
        }
    }
}
