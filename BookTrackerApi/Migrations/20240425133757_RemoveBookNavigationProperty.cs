using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookTrackerApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveBookNavigationProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LibraryEntries_Books_BookId",
                table: "LibraryEntries");

            migrationBuilder.DropIndex(
                name: "IX_LibraryEntries_BookId",
                table: "LibraryEntries");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_LibraryEntries_BookId",
                table: "LibraryEntries",
                column: "BookId");

            migrationBuilder.AddForeignKey(
                name: "FK_LibraryEntries_Books_BookId",
                table: "LibraryEntries",
                column: "BookId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
