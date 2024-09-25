import { API_SOCIAL } from '../constants.js'; // Ensure this import is added
import { getHeaders } from '../headers.js';   // Import the header creation function

export async function deletePost(postId) {
    const response = await fetch(`${API_SOCIAL}/posts/${postId}`, {
        method: "DELETE",
        headers: getHeaders(),  // Use the getHeaders function to include API key and token
    });

    if (response.status !== 204) {
        throw new Error("Failed to delete the post");
    }

    return response;
}
