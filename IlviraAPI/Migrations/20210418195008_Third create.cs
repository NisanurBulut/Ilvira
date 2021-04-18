using Microsoft.EntityFrameworkCore.Migrations;

namespace IlviraAPI.Migrations
{
    public partial class Thirdcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_OrderMaster_OrderMasterId",
                table: "OrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetail_tDessertItem_DessertItemId",
                table: "OrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderMaster_tCustomer_CustomerId",
                table: "OrderMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tDessertItem",
                table: "tDessertItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderMaster",
                table: "OrderMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail");

            migrationBuilder.RenameTable(
                name: "tDessertItem",
                newName: "tDessert");

            migrationBuilder.RenameTable(
                name: "OrderMaster",
                newName: "tOrderMaster");

            migrationBuilder.RenameTable(
                name: "OrderDetail",
                newName: "tOrderDetail");

            migrationBuilder.RenameIndex(
                name: "IX_OrderMaster_CustomerId",
                table: "tOrderMaster",
                newName: "IX_tOrderMaster_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_OrderMasterId",
                table: "tOrderDetail",
                newName: "IX_tOrderDetail_OrderMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetail_DessertItemId",
                table: "tOrderDetail",
                newName: "IX_tOrderDetail_DessertItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tDessert",
                table: "tDessert",
                column: "DessertItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tOrderMaster",
                table: "tOrderMaster",
                column: "OrderMasterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tOrderDetail",
                table: "tOrderDetail",
                column: "OrderDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_tOrderDetail_tDessert_DessertItemId",
                table: "tOrderDetail",
                column: "DessertItemId",
                principalTable: "tDessert",
                principalColumn: "DessertItemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tOrderDetail_tOrderMaster_OrderMasterId",
                table: "tOrderDetail",
                column: "OrderMasterId",
                principalTable: "tOrderMaster",
                principalColumn: "OrderMasterId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tOrderMaster_tCustomer_CustomerId",
                table: "tOrderMaster",
                column: "CustomerId",
                principalTable: "tCustomer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tOrderDetail_tDessert_DessertItemId",
                table: "tOrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tOrderDetail_tOrderMaster_OrderMasterId",
                table: "tOrderDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_tOrderMaster_tCustomer_CustomerId",
                table: "tOrderMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tOrderMaster",
                table: "tOrderMaster");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tOrderDetail",
                table: "tOrderDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tDessert",
                table: "tDessert");

            migrationBuilder.RenameTable(
                name: "tOrderMaster",
                newName: "OrderMaster");

            migrationBuilder.RenameTable(
                name: "tOrderDetail",
                newName: "OrderDetail");

            migrationBuilder.RenameTable(
                name: "tDessert",
                newName: "tDessertItem");

            migrationBuilder.RenameIndex(
                name: "IX_tOrderMaster_CustomerId",
                table: "OrderMaster",
                newName: "IX_OrderMaster_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_tOrderDetail_OrderMasterId",
                table: "OrderDetail",
                newName: "IX_OrderDetail_OrderMasterId");

            migrationBuilder.RenameIndex(
                name: "IX_tOrderDetail_DessertItemId",
                table: "OrderDetail",
                newName: "IX_OrderDetail_DessertItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderMaster",
                table: "OrderMaster",
                column: "OrderMasterId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderDetail",
                table: "OrderDetail",
                column: "OrderDetailId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tDessertItem",
                table: "tDessertItem",
                column: "DessertItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_OrderMaster_OrderMasterId",
                table: "OrderDetail",
                column: "OrderMasterId",
                principalTable: "OrderMaster",
                principalColumn: "OrderMasterId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetail_tDessertItem_DessertItemId",
                table: "OrderDetail",
                column: "DessertItemId",
                principalTable: "tDessertItem",
                principalColumn: "DessertItemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderMaster_tCustomer_CustomerId",
                table: "OrderMaster",
                column: "CustomerId",
                principalTable: "tCustomer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
