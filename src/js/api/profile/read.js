import { getHeaders } from '../headers.js'; // Import the getHeaders function
import { API_SOCIAL_PROFILES } from '../constants.js'; // Import the base URL for profiles

export async function fetchUserPosts() {
    const username = localStorage.getItem('username'); // Get the username from localStorage

    if (!username) {
        console.error('Username is not defined. Make sure the user is logged in and username is stored.');
        return []; // Return an empty array if username is not found
    }

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, { // Use the new endpoint
            method: 'GET',
            headers: getHeaders(), // Use the headers function to get the authorization
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Posts fetched successfully:', data); // Log the response for debugging

        // Return only the latest 12 posts
        return data.data ? data.data.slice(0, 12) : []; // Slice to get the latest 12 posts
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return []; // Return an empty array on error
    }
}