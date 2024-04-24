import React, { useState } from 'react';

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
            title,
            author,
            description,
        };

        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                // Book added successfully, handle the response as needed
                console.log('Book added successfully');
            } else {
                // Handle error response from the server
                console.error('Error adding book');
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title: <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Author:  <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Description: <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;