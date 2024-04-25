const API_URL = 'https://booktrackerapp2.azurewebsites.net';

export const fetchApi = async (endpoint, method, body) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    console.log('Response:', response);
    console.log('Status:', response.status);
    console.log('Headers:', JSON.stringify(response.headers));

    // Check if the HTTP response status code is successful
    if (response.ok) {
        // If the status code is 204, it means success with no content, so don't try to parse JSON
        if (response.status === 204) {
            return { ok: true, data: null }; // Return null data
        }
        try {
            // Try parsing the response as JSON
            const jsonResponse = await response.json();
            return { ok: true, data: jsonResponse };
        } catch (error) {
            // If JSON parsing fails, return the error
            return { ok: false, error: "Failed to parse JSON response." };
        }
    } else {
        let errorResponse = 'No error message';
        try {
            // Try parsing the response as text to log detailed error message
            errorResponse = await response.text();
        } catch (error) {
            errorResponse = 'Failed to read error response';
        }
        console.log('Error response body:', errorResponse);
        return { ok: false, error: `HTTP Error: ${response.status} - ${response.statusText}`, details: errorResponse };
    }
};
