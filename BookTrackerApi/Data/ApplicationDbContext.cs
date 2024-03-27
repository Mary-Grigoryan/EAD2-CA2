using Microsoft.EntityFrameworkCore;
using BookTrackerApi.Models;

namespace BookTrackerApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<LibraryEntry> LibraryEntries { get; set; }

        // Model configuration can be added here if needed
    }
}
