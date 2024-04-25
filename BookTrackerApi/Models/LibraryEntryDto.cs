// LibraryEntryDto.cs in the Models directory or a new DTOs directory

namespace BookTrackerApi.Models
{
    public class LibraryEntryDto
    {
        public int BookId { get; set; }
        public string UserId { get; set; }
        public string ReadingStatus { get; set; }
    }
}
