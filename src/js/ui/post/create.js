import { createPost } from "../../api/post/create.js";

/**
 * Handles the form submission for creating a post.
 * Gathers form data and calls the createPost function from the API.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the post creation is complete.
 */

export async function onCreatePost(event) {
    event.preventDefault();  

    const formData = new FormData(event.target);  
    const postData = {
        title: formData.get('title'),
        body: formData.get('body'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : undefined,
        media: formData.get('media') ? { url: formData.get('media'), alt: '' } : null,
    };

    const createdPost = await createPost(postData);  

    if (createdPost) {
        localStorage.setItem('latestPost', JSON.stringify(createdPost.data));
        displayCreatedPost(createdPost);  
    }
}

/**
 * Displays the created post on the page.
 *
 * @function displayCreatedPost
 * @param {Object} post - The created post data.
 * @param {Object} post.data - The post's data.
 * @param {string} post.data.title - The title of the post.
 * @param {string} post.data.body - The body text of the post.
 * @param {Object|null} post.data.media - The media object associated with the post.
 * @param {Array<string>} [post.data.tags] - An optional array of tags associated with the post.
 * @returns {void}
 */

function displayCreatedPost(post) {
    const postData = post.data;  

    const postContainer = document.getElementById('postContainer');
    
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

    if (postData.tags && postData.tags.length > 0) {
        const tagList = document.createElement('p');
        tagList.textContent = 'Tags: ' + postData.tags.join(', ');
        postElement.appendChild(tagList);
    }

    postElement.appendChild(postTitle);
    postElement.appendChild(postBody);

    const viewProfileButton = document.createElement('button');
    viewProfileButton.textContent = 'View in Profile';
    viewProfileButton.addEventListener('click', () => {
        window.location.href = '/profile/';
    });

    postElement.appendChild(viewProfileButton);

    postContainer.appendChild(postElement);
}



