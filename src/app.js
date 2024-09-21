import "./css/style.css";

import router from "./js/router";

import "./js/api/auth/register.js";

import "./js/api/auth/login.js"; 

await router(window.location.pathname);



import { logout } from './js/ui/auth/logout.js';  

const logoutButton = document.getElementById('logout');

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}


import { createPost } from './js/api/post/create.js';  // Import the createPost function

const createPostForm = document.forms['createPost'];  // Get the createPost form

if (createPostForm) {
    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent the default form submission behavior

        const formData = new FormData(createPostForm);

        const postData = {
            title: formData.get('title'),
            body: formData.get('body'),
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
            media: formData.get('media'),
        };

        await createPost(postData);  // Call the createPost function with the form data
    });
}
