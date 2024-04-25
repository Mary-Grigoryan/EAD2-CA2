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
        try {
            // Try parsing the response as JSON
            const jsonResponse = await response.json();
            return { ok: true, data: jsonResponse };
        } catch (error) {
            // If JSON parsing fails, return the error
            return { ok: false, error: "Failed to parse JSON response." };
        }
    } else {
        // If the response status is not successful, return the status and statusText
        return { ok: false, error: `HTTP Error: ${response.status} - ${response.statusText}` };
    }
};
