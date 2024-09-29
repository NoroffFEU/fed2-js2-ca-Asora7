import { getHeaders } from '../headers.js'; 
import { API_SOCIAL_PROFILES } from '../constants.js'; 

/**
 * Fetches the latest posts for the currently logged-in user.
 * 
 * @async
 * @function fetchUserPosts
 * @returns {Promise<Array<Object>>} An array of the latest user posts, or an empty array if an error occurs.
 * @throws {Error} If fetching posts fails.
 */

export async function fetchUserPosts() {
    const username = localStorage.getItem('username'); 

    if (!username) {
        console.error('Username is not defined. Make sure the user is logged in and username is stored.');
        return []; 
    }

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, { 
            method: 'GET',
            headers: getHeaders(), 
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data = await response.json();

        return data.data ? data.data.slice(0, 12) : []; 
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return []; 
    }
}