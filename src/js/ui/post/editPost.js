import { fetchPostById } from '../../api/post/read.js'; // Adjust the import path as needed

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
    } catch (error) {
        console.error('Error loading post for editing:', error);
        document.getElementById('postContainer').innerHTML = '<p>Failed to load post. Please try again later.</p>'; // Error message
    }
}

// Check if we're on the edit page
if (window.location.pathname.includes('/post/edit/')) {
    // Call to get post ID
    const postId = getUrlParameter('id'); // Get post ID from the URL

    // Debugging output
    console.log('Current URL:', window.location.href);
    console.log('Post ID from URL:', postId);

    // Check if postId is null or undefined
    if (!postId) {
        console.error("No post ID provided in the URL");
        // Optionally redirect or display a message to the user
    } else {
        // Proceed to render post for editing
        renderPostForEditing(postId); // Pass postId as an argument
    }
}
