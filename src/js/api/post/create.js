import { API_SOCIAL_POSTS } from '../constants.js';  // Import the posts endpoint
import { getHeaders } from '../headers.js';  // Import the updated headers

export async function createPost({ title, body, tags, media }) {
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: 'POST',
            headers: getHeaders(),  // Uses updated getHeaders with token
            body: JSON.stringify({ title, body, tags, media }),  // Send post data
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create post: ${errorData.errors[0].message}`);
        }

        const data = await response.json();
        console.log('Post created successfully:', data);

        // Optionally redirect on success
        // window.location.href = '/post/index.html';  // Redirect to your desired page

    } catch (error) {
        console.error('Error during post creation:', error);
    }
}

const createPostForm = document.forms['createPost'];  // Use the form name 'createPost'

if (createPostForm) {
    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent the form from refreshing the page

        const formData = new FormData(createPostForm);  // Get the form data

        const postData = {
            title: formData.get('title'),
            body: formData.get('body'),
            media: formData.get('media') || null,  // Optional, set to null if empty
        };

        await createPost(postData);  // Call the function to create a post
    });
}

