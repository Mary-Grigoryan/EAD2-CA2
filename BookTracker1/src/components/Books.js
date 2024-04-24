import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const response = await fetch('/api/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>All Books</h1>
            {books.map((book) => (
                <div key={book.id}>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                </div>
            ))}
            <Link to="/AddBook">
                <button>Add Book</button>
            </Link>
            <Link to="/UpdateBook">
                <button>Update Book</button>
            </Link>
        </div>
    );
};

export default Books;
