import { fetchPostById } from '../../api/post/read.js'; // Adjust the import path as needed

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to render the post for editing
async function renderPostForEditing() {
    const postId = getUrlParameter('id'); // Get post ID from the URL

    if (!postId) {
        console.error('No post ID provided in the URL');
        return;
    }

    try {
        const post = await fetchPostById(postId); // Fetch the post using the ID

        if (!post) {
            throw new Error('Post not found');
        }

        // Populate form fields with post data
        document.getElementById('postTitle').value = post.title; // Assuming you have an input with this ID
        document.getElementById('postBody').value = post.body;

        if (post.media) {
            document.getElementById('postMedia').value = post.media.url; // For media URL input
        }
    } catch (error) {
        console.error('Error loading post for editing:', error);
        document.getElementById('postContainer').innerHTML = '<p>Failed to load post. Please try again later.</p>'; // Error message
    }
}

// Call the function to load the post when the script runs
renderPostForEditing();
