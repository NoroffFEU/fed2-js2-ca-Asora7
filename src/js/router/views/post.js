// src/js/router/views/post.js

import { fetchPostById } from '../../api/post/read.js'; // Import your API function

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to display the single post
async function renderSinglePost() {
    const postId = getUrlParameter('id'); // Get the post ID from the URL

    if (!postId) {
        console.error('No post ID found in the URL');
        return;
    }

    try {
        const post = await fetchPostById(postId); // Fetch the post by ID

        if (!post) {
            throw new Error('Post not found');
        }

        // Render the post on the page
        const postContainer = document.getElementById('singlePostContainer');
        postContainer.innerHTML = `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt || 'Media'}">` : ''}
            <button id="editButton">Edit</button> <!-- Add an Edit button -->
        `;

        // Add an event listener for the edit button
        document.getElementById('editButton').addEventListener('click', () => {
            window.location.href = `/post/edit/?id=${postId}`; // Redirect to the edit page with the post ID
        });
        
    } catch (error) {
        console.error('Error fetching single post:', error);
        document.getElementById('singlePostContainer').innerHTML = '<p>Failed to load the post.</p>';
    }
}

// Check if we're on the single post page and render the post
if (window.location.pathname === '/post/view/') {
    renderSinglePost();
}

