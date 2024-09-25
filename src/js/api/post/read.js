export async function readPost(id) {}

export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}

import { getHeaders } from '../headers.js'; // Import the getHeaders function
import { API_SOCIAL_POSTS } from '../constants.js'; // Import the API endpoint for posts

export async function fetchPostById(postId) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data; // Assuming your API returns the post in the 'data' field
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        return null; // Return null on failure
    }
}
