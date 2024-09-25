import { fetchPostById } from '../../api/post/read.js'; // Adjust the import path as needed
import { updatePost } from '../../api/post/update.js'; // Import the updatePost function

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to render the post for editing
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

        // Populate form fields with post data
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postBody').value = post.body;
        if (post.media) {
            document.getElementById('postMedia').value = post.media.url; // For media URL input
        }

        // Set up form submission handler
        const form = document.getElementById('editPostForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission

            // Gather form data
            const mediaUrl = document.getElementById('postMedia').value.trim(); // Get and trim media URL input

            // Create updated post object
            const updatedPost = {
                title: document.getElementById('postTitle').value,
                body: document.getElementById('postBody').value,
                tags: [], // Adjust based on your requirements
            };

            // Add media only if a valid URL is provided
            if (mediaUrl) {
                updatedPost.media = {
                    url: mediaUrl,
                    alt: 'Media Description', // Optional description, adjust as needed
                };
            }

            // Call the updatePost function
            try {
                const result = await updatePost(postId, updatedPost);

                // Display updated post if successful
                if (result) {
                    displayUpdatedPost(result);
                } else {
                    console.error('Failed to update post.');
                }
            } catch (error) {
                console.error('Error updating post:', error);
            }
        });
    } catch (error) {
        console.error('Error loading post for editing:', error);
        document.getElementById('postContainer').innerHTML = '<p>Failed to load post. Please try again later.</p>'; // Error message
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

    // Append the updated post to the body or a specific container
    document.body.appendChild(postContainer); // Adjust as needed
}

// Check if we're on the edit page
if (window.location.pathname.includes('/post/edit/')) {
    const postId = getUrlParameter('id'); // Get post ID from the URL

    // Debugging output
    console.log('Current URL:', window.location.href);
    console.log('Post ID from URL:', postId);

    if (!postId) {
        console.error("No post ID provided in the URL");
    } else {
        renderPostForEditing(postId); // Pass postId as an argument
    }
}
