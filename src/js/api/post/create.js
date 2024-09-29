import { API_SOCIAL_POSTS } from '../constants.js';  
import { getHeaders } from '../headers.js';  

/**
 * Creates a new post by sending the post data to the social API.
 * 
 * @async
 * @function createPost
 * @param {Object} postData - The data for the post to be created.
 * @param {string} postData.title - The title of the post (required).
 * @param {string} postData.body - The body content of the post (required).
 * @param {Array<string>} [postData.tags] - An optional array of tags associated with the post.
 * @param {string} [postData.media] - An optional URL for media (image/video) associated with the post.
 * @returns {Promise<Object|null>} The created post data if successful, or `null` if the creation fails.
 * @throws {Error} If the API call fails or returns an error response.
 */

export async function createPost({ title, body, tags, media }) {
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ title, body, tags, media }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create post: ${errorData.errors[0].message}`);
        }

        const data = await response.json();
        console.log('Post created successfully:', data);  // Keep for success logs
        return data;  

    } catch (error) {
        console.error('Error during post creation:', error);  // Keep for error logging
        return null;  
    }
}




















