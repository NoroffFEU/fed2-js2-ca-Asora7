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

    } catch (error) {
        console.error('Error during post creation:', error);
    }
}

const createPostForm = document.forms['createPost'];  

if (createPostForm) {
    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();  

        const formData = new FormData(createPostForm);  

        const postData = {
            title: formData.get('title'),
            body: formData.get('body'),
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
            media: formData.get('media') ? { url: formData.get('media'), alt: '' } : null,
        };

        await createPost(postData);  
    });
}








