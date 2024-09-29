import { getHeaders } from '../headers.js'; 
import { API_SOCIAL_POSTS } from '../constants.js'; 

/**
 * Fetches a post by its ID from the API.
 * 
 * @async
 * @function fetchPostById
 * @param {string} postId - The ID of the post to fetch.
 * @returns {Promise<Object|null>} The post data if successful, or null if there is an error.
 * @throws {Error} If the fetch request fails or the API returns an error.
 */

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
        return data.data; 
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        return null; 
    }
}