import { getHeaders } from '../headers.js'; 
import { API_SOCIAL_POSTS } from '../constants.js'; 

/**
 * Updates a post with the given ID.
 * 
 * @async
 * @function updatePost
 * @param {string} id - The ID of the post to update.
 * @param {Object} postData - The data to update the post with.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body content of the post.
 * @param {Array<string>} [postData.tags] - An optional array of tags for the post.
 * @param {string} [postData.media] - An optional media URL.
 * @returns {Promise<Object>} The updated post data.
 * @throws {Error} If the update fails, with details from the response.
 */
export async function updatePost(id, { title, body, tags = [], media }) {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
            method: 'PUT', 
            headers: {
                ...getHeaders(), 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body, tags, media }), 
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to update post: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error('Error in updatePost function:', error);
        throw error; 
    }
}

