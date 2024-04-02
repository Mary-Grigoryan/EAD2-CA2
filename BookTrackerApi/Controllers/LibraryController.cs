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
        public async Task<ActionResult<IEnumerable<LibraryEntry>>> GetLibraryEntries()
        {
            // Example of using the localizer
            var message = _localizer["LibraryEntriesRetrieved"];
            // Do something with the message or return it in the response
            return await _context.LibraryEntries.Include(le => le.Book).ToListAsync();
        }

        // GET: /library/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LibraryEntry>> GetLibraryEntry(int id)
        {
            var libraryEntry = await _context.LibraryEntries.Include(le => le.Book).FirstOrDefaultAsync(le => le.Id == id);

            if (libraryEntry == null)
            {
                // Using localizer for NotFound message
                return NotFound(_localizer["LibraryEntryNotFound"].Value);
            }

            return libraryEntry;
        }

        // POST: /library
        [HttpPost]
        public async Task<ActionResult<LibraryEntry>> PostLibraryEntry(LibraryEntry libraryEntry)
        {
            _context.LibraryEntries.Add(libraryEntry);
            await _context.SaveChangesAsync();

            // Using localizer for the Created message
            return CreatedAtAction(nameof(GetLibraryEntry), new { id = libraryEntry.Id }, _localizer["LibraryEntryCreated"].Value);
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
