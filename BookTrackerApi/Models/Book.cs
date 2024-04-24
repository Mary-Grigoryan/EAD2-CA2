using System.ComponentModel.DataAnnotations;

namespace BookTrackerApi.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public required string Genre { get; set; }
        public int PublicationYear { get; set; }
        public string? Synopsis { get; set; }
    }
}
