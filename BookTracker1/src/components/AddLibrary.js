const express = require('express');
const sql = require('mssql');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// POST /library endpoint
app.post('/library', async (req, res) => {
    // Get the book details from the request body
    const { title, author, genre } = req.body;

    try {
        // Create a connection pool
        let pool = await sql.connect(config);

        // Query to insert the book into the database
        let result = await pool.request()
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('genre', sql.NVarChar, genre)
            .query('INSERT INTO Books (Title, Author, Genre) VALUES (@title, @author, @genre)');

        // Send a response indicating success
        res.status(201).json({ message: 'Book added to library' });
    } catch (err) {
        // Error handling
        console.error(err);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
