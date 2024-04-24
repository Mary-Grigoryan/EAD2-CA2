// Function to update book details
const updateBook = async (bookId, updatedDetails) => {
    try {
        const response = await fetch(`/api/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDetails)
        });

        if (response.ok) {
            const updatedBook = await response.json();
            // Handle the response and perform necessary actions
            console.log(updatedBook); // Example: Log the updated book details
        } else {
            throw new Error('Failed to update book');
        }
    } catch (error) {
        // Handle any errors that occur during the request
        console.error(error);
    }
};


updateBook(bookId, updatedDetails);