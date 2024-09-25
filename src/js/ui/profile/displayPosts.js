// Import your fetchUserPosts function from the appropriate location
import { fetchUserPosts } from '../../api/profile/read.js';

// Function to render posts on the profile page
async function renderUserPosts() {
    const postContainer = document.getElementById('postContainer');

    try {
        const posts = await fetchUserPosts(); // Fetch the user's posts

        // Check if posts is an array
        if (!Array.isArray(posts)) {
            throw new Error('Fetched posts is not an array');
        }

        // Clear any previous posts
        postContainer.innerHTML = '';

        // Check if no posts were found
        if (posts.length === 0) {
            postContainer.innerHTML = '<p>No posts found.</p>'; 
            return; 
        }

        // Render each post
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const postTitle = document.createElement('h2');
            postTitle.textContent = post.title;

            const postBody = document.createElement('p');
            postBody.textContent = post.body;

            if (post.media) {
                const postMedia = document.createElement('img');
                postMedia.src = post.media.url;
                postMedia.alt = post.media.alt || 'Media';
                postElement.appendChild(postMedia);
            }

            postElement.appendChild(postTitle);
            postElement.appendChild(postBody);

            // Create and append the Edit button
            const editButton = document.createElement('a');
            editButton.href = `/post/edit/?id=${post.id}`; // Link to the edit page with post ID
            editButton.textContent = 'Edit Post'; 

            postElement.appendChild(editButton); 
            postContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading user posts:', error);
        postContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>'; 
    }
}

renderUserPosts();
