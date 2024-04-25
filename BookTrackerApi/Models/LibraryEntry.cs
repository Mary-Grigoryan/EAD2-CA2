using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; // Make sure you have this using directive

namespace BookTrackerApi.Models
{
    public class LibraryEntry
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        [JsonIgnore] // prevent serialization/deserialization
        public Book Book { get; set; }

        public string UserId { get; set; } // Assume we have user identification in place

        public string ReadingStatus { get; set; } // "to read", "reading now", "have read"
    }
}
