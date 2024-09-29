import { fetchUserPosts } from '../../api/profile/read.js';

/**
 * Renders the user's posts by fetching them from the API and updating the DOM.
 * 
 * @async
 * @function renderUserPosts
 * @throws {Error} If the fetched posts are not an array or if there is an error while fetching posts.
 */

async function renderUserPosts() {
    const postContainer = document.getElementById('postContainer');

    try {
        const posts = await fetchUserPosts();

        if (!Array.isArray(posts)) {
            throw new Error('Fetched posts is not an array');
        }

        postContainer.innerHTML = '';

        if (posts.length === 0) {
            postContainer.innerHTML = '<p>No posts found.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const postLink = document.createElement('a');
            postLink.href = `/post/view/?id=${post.id}`; 
            postLink.textContent = post.title;

            const postBody = document.createElement('p');
            postBody.textContent = post.body;

            postElement.appendChild(postLink); 
            postElement.appendChild(postBody);

            if (post.media) {
                const postMedia = document.createElement('img');
                postMedia.src = post.media.url;
                postMedia.alt = post.media.alt || 'Media';
                postElement.appendChild(postMedia);
            }

            postContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading user posts:', error);
        postContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
    }
}

renderUserPosts();
