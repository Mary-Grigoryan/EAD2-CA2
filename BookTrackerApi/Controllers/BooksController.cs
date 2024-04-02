using Microsoft.AspNetCore.Mvc;
using BookTrackerApi.Data;
using BookTrackerApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    private readonly IStringLocalizer<BooksController> _localizer; // Localizer

    public BooksController(ApplicationDbContext context, IStringLocalizer<BooksController> localizer) // Localizer
    {
        _context = context;
        _localizer = localizer; // Localizer
    }

    // GET: /books
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        // Example of using the localizer to get a localized string
        var message = _localizer["BooksListMessage"];
        // Use 'message' wherever you need the localized string
        return await _context.Books.ToListAsync();
    }

    // GET: /books/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null || _context.Books == null)
        {
            // Using localizer for NotFound message
            return NotFound();
        }

        return book;
    }

    // POST: /books
    [HttpPost]
    public async Task<ActionResult<Book>> PostBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        // Using localizer for the Created message
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, _localizer["BookCreatedMessage"].Value);
    }

    // PUT: /books/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBook(int id, Book book)
    {
        if (id != book.Id)
        {
            return BadRequest();
        }

        _context.Entry(book).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BookExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: /books/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BookExists(int id)
    {
        return _context.Books.Any(e => e.Id == id);
    }
}
