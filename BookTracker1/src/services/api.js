const BASE_URL = 'https://booktrackerapp2.azurewebsites.net';

// Function to fetch books
export const fetchBooks = async (title) => {
    try {
        const response = await fetch(`${BASE_URL}/books/search?query=${encodeURIComponent(title)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

// Function to fetch a single book by ID
export const fetchBookById = async (bookId) => {
    try {
        const response = await fetch(`${BASE_URL}/books/${bookId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

// Add other API functions as needed
