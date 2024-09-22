import { createPost } from "../../api/post/create.js";

// Handle the form submission
export async function onCreatePost(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData(event.target);  // Capture form data
    const postData = {
        title: formData.get('title'),
        body: formData.get('body'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
        media: formData.get('media') ? { url: formData.get('media'), alt: '' } : null,
    };

    const createdPost = await createPost(postData);  // Create the post via the API

    if (createdPost) {
        displayCreatedPost(createdPost);  // Display the created post in the UI
    }
}

// Function to display the created post
function displayCreatedPost(post) {
    const postData = post.data;  // Access the `data` property of the response

    const postContainer = document.getElementById('postContainer');
    
    // Create a post element
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postTitle = document.createElement('h2');
    postTitle.textContent = postData.title;

    const postBody = document.createElement('p');
    postBody.textContent = postData.body;

    if (postData.media) {
        const postMedia = document.createElement('img');
        postMedia.src = postData.media.url;
        postMedia.alt = postData.media.alt || 'Media';
        postElement.appendChild(postMedia);
    }

    postElement.appendChild(postTitle);
    postElement.appendChild(postBody);

    // Append the post element to the container
    postContainer.appendChild(postElement);
}

