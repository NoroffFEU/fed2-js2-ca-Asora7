import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
    event.preventDefault();  

    const formData = new FormData(event.target);  
    const postData = {
        title: formData.get('title'),
        body: formData.get('body'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
        media: formData.get('media') ? { url: formData.get('media'), alt: '' } : null,
    };

    const createdPost = await createPost(postData);  

    if (createdPost) {
        localStorage.setItem('latestPost', JSON.stringify(createdPost.data));
        displayCreatedPost(createdPost);  
    }
}

// Function to display the created post
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



