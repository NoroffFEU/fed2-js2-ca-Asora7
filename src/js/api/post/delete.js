import { API_SOCIAL } from '../constants.js'; 
import { getHeaders } from '../headers.js';   

/**
 * Deletes a post by its ID by sending a DELETE request to the social API.
 * 
 * @async
 * @function deletePost
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise<Response>} A response object if the deletion is successful.
 * @throws {Error} If the deletion fails or the API does not return a 204 No Content status.
 */
export async function deletePost(postId) {
    const response = await fetch(`${API_SOCIAL}/posts/${postId}`, {
        method: "DELETE",
        headers: getHeaders(),  
    });

    if (response.status !== 204) {
        throw new Error("Failed to delete the post");
    }

    return response; 
}
