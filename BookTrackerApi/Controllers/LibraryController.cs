using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using BookTrackerApi.Data;
using BookTrackerApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace BookTrackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LibraryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/library
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LibraryEntry>>> GetLibraryEntries()
        {
            return await _context.LibraryEntries.Include(le => le.Book).ToListAsync();
        }

        // GET: api/library/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LibraryEntry>> GetLibraryEntry(int id)
        {
            var libraryEntry = await _context.LibraryEntries.Include(le => le.Book).FirstOrDefaultAsync(le => le.Id == id);

            if (libraryEntry == null)
            {
                return NotFound();
            }

            return libraryEntry;
        }

        // POST: api/library
        [HttpPost]
        public async Task<ActionResult<LibraryEntry>> PostLibraryEntry(LibraryEntry libraryEntry)
        {
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

        // DELETE: api/library/{id}
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