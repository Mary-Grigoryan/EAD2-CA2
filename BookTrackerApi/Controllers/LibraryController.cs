using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using BookTrackerApi.Data;
using BookTrackerApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Localization; // Required for IStringLocalizer

namespace BookTrackerApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly IStringLocalizer<LibraryController> _localizer;

        public LibraryController(ApplicationDbContext context, IStringLocalizer<LibraryController> localizer)
        {
            _context = context;
            _localizer = localizer;
        }

        // GET: /library
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetLibraryEntries()
        {
            // Perform a manual join to get library entries with book details
            var libraryWithBooks = await _context.LibraryEntries
                .Join(_context.Books,
                    library => library.BookId,
                    book => book.Id,
                    (library, book) => new
                    {
                        library.Id,
                        library.BookId,
                        library.UserId,
                        library.ReadingStatus,
                        BookTitle = book.Title,
                        BookAuthor = book.Author,
                        BookPublicationYear = book.PublicationYear
                    })
                .ToListAsync();

            return Ok(libraryWithBooks);
        }

        // GET: /library/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LibraryEntry>> GetLibraryEntry(int id)
        {
            var libraryEntry = await _context.LibraryEntries.FirstOrDefaultAsync(le => le.Id == id);

            if (libraryEntry == null)
            {
                // Using localizer for NotFound message
                return NotFound(_localizer["LibraryEntryNotFound"].Value);
            }

            return libraryEntry;
        }

        // POST: /library
        [HttpPost]
        public async Task<ActionResult<LibraryEntry>> PostLibraryEntry([FromBody] LibraryEntryDto libraryEntryDto)
        {
            var libraryEntry = new LibraryEntry
            {
                BookId = libraryEntryDto.BookId,
                UserId = libraryEntryDto.UserId,
                ReadingStatus = libraryEntryDto.ReadingStatus
            };

            _context.LibraryEntries.Add(libraryEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLibraryEntry), new { id = libraryEntry.Id }, libraryEntry);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchLibraryEntry(int id, [FromBody] JsonPatchDocument<LibraryEntry> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var libraryEntry = await _context.LibraryEntries.FindAsync(id);
            if (libraryEntry == null)
            {
                return NotFound();
            }

            patchDoc.ApplyTo(libraryEntry);

            if (!TryValidateModel(libraryEntry))
            {
                return new BadRequestObjectResult(ModelState);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: /library/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibraryEntry(int id)
        {
            var libraryEntry = await _context.LibraryEntries.FindAsync(id);
            if (libraryEntry == null)
            {
                return NotFound();
            }

            _context.LibraryEntries.Remove(libraryEntry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LibraryEntryExists(int id)
        {
            return _context.LibraryEntries.Any(e => e.Id == id);
        }
    }
}
