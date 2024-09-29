import { fetchPostById } from '../../api/post/read.js'; 
import { updatePost } from '../../api/post/update.js'; 
import { deletePost } from '../../api/post/delete.js'; 

/**
 * Gets the value of a URL parameter by its name.
 * @param {string} name - The name of the URL parameter.
 * @returns {string|null} The value of the parameter, or null if not found.
 */

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


/**
 * Renders the post data in the edit form for the given post ID.
 * Fetches the post data and populates the form fields. Sets up event listeners
 * for updating and deleting the post.
 * 
 * @param {string} postId - The ID of the post to be edited.
 */

async function renderPostForEditing(postId) {
    if (!postId) {
        console.error('No post ID provided for rendering');
        return;
    }

    try {
        const post = await fetchPostById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        document.getElementById('postTitle').value = post.title;
        document.getElementById('postBody').value = post.body;
        if (post.media) {
            document.getElementById('postMedia').value = post.media.url; 
        }

        const form = document.getElementById('editPostForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const mediaUrl = document.getElementById('postMedia').value.trim(); 
            const updatedPost = {
                title: document.getElementById('postTitle').value,
                body: document.getElementById('postBody').value,
                tags: [], 
            };

            if (mediaUrl) {
                updatedPost.media = {
                    url: mediaUrl,
                    alt: 'Media Description', 
                };
            }

            try {
                const result = await updatePost(postId, updatedPost);
                if (result) {
                    displayUpdatedPost(result);
                } else {
                    console.error('Failed to update post.');
                }
            } catch (error) {
                console.error('Error updating post:', error);
            }
        });

        const deleteButton = document.getElementById('deletePostButton');
        deleteButton.addEventListener('click', async () => {
            const confirmation = confirm('Are you sure you want to delete this post?');
            if (confirmation) {
                try {
                    await deletePost(postId); 
                    alert('Post deleted successfully!');
                    window.location.href = '/profile/';
                } catch (error) {
                    console.error('Error deleting post:', error);
                    alert('Failed to delete the post.');
                }
            }
        });

    } catch (error) {
        console.error('Error loading post for editing:', error);
        document.getElementById('postContainer').innerHTML = '<p>Failed to load post. Please try again later.</p>';
    }
}


/**
 * Displays the updated post on the page after a successful update.
 * 
 * @param {Object} post - The updated post object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {Object} [post.media] - The media object associated with the post.
 * @param {string} post.media.url - The URL of the media.
 * @param {string} [post.media.alt] - The alt text for the media.
 */

function displayUpdatedPost(post) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('updated-post');

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;

    const postBody = document.createElement('p');
    postBody.textContent = post.body;

    if (post.media) {
        const postMedia = document.createElement('img');
        postMedia.src = post.media.url;
        postMedia.alt = post.media.alt || 'Media';
        postContainer.appendChild(postMedia);
    }

    postContainer.appendChild(postTitle);
    postContainer.appendChild(postBody);

    document.body.appendChild(postContainer);
}

if (window.location.pathname.includes('/post/edit/')) {
    const postId = getUrlParameter('id'); 

    if (!postId) {
        console.error("No post ID provided in the URL");
    } else {
        renderPostForEditing(postId);
    }
}
