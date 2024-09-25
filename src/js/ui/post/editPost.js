import { fetchPostById } from '../../api/post/read.js'; 
import { updatePost } from '../../api/post/update.js'; 
import { deletePost } from '../../api/post/delete.js'; // Import delete function

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

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

        // Fill the form with the current post details
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postBody').value = post.body;
        if (post.media) {
            document.getElementById('postMedia').value = post.media.url; 
        }

        // Add submit event listener for the edit form
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

        // Add click event listener for the delete button
        const deleteButton = document.getElementById('deletePostButton');
        deleteButton.addEventListener('click', async () => {
            const confirmation = confirm('Are you sure you want to delete this post?');
            if (confirmation) {
                try {
                    await deletePost(postId); // Call the delete function
                    alert('Post deleted successfully!');
                    // Optionally, redirect to another page after deletion, e.g., profile or home
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

// Function to display the updated post
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

// Check if we're on the edit page
if (window.location.pathname.includes('/post/edit/')) {
    const postId = getUrlParameter('id'); 

    if (!postId) {
        console.error("No post ID provided in the URL");
    } else {
        renderPostForEditing(postId);
    }
}
