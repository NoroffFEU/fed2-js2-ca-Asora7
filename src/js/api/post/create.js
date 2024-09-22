import { API_SOCIAL_POSTS } from '../constants.js';  
import { getHeaders } from '../headers.js';  

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
        console.log('Post created successfully:', data);
        return data;  // Return the created post data

    } catch (error) {
        console.error('Error during post creation:', error);
        return null;  // Return null on failure
    }
}




















