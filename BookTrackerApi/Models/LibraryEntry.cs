using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookTrackerApi.Models
{
    public class LibraryEntry
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        public string UserId { get; set; } // user identification

        public string ReadingStatus { get; set; } // "to read", "reading now", "have read"
    }
}
