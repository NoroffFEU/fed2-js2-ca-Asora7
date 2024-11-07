/**
 * @module post
 *
 * This module handles the rendering of a single post based on the post ID
 * obtained from the URL. It includes functionality for fetching the post data
 * and displaying it, along with an option to edit the post.
 */

import { fetchPostById } from '../../api/post/read.js'; // Import your API function
import { authGuard } from '../../utilities/authGuard';

authGuard();

/**
 * Retrieves a URL parameter by name.
 *
 * @param {string} name - The name of the parameter to retrieve from the URL.
 * @returns {string|null} The value of the parameter, or null if not found.
 */

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * Renders a single post by fetching its data using the post ID from the URL.
 * If the post is successfully fetched, it is displayed in the post container.
 * Otherwise, an error message is shown.
 */

async function renderSinglePost() {
  const postId = getUrlParameter('id');

  if (!postId) {
    console.error('No post ID found in the URL');
    return;
  }

  try {
    const post = await fetchPostById(postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const postContainer = document.getElementById('singlePostContainer');

    postContainer.innerHTML = `
            <h1 class="post-title">${post.title}</h1>
            <div class="post-image-container position-relative">
                <!-- Edit Button -->
                <button id="editButton" class="btn btn-primary edit-button position-absolute top-0 end-0 m-3">Edit</button>
                <!-- Dynamically insert the image with proper styling -->
                ${post.media ? `<img id="post-image" class="post-image img-fluid" src="${post.media.url}" alt="${post.media.alt || 'Media'}">` : ''}
            </div>
            <div id="post-body" class="post-body mt-4">
                <p>${post.body}</p>
            </div>
        `;

    document.getElementById('editButton').addEventListener('click', () => {
      window.location.href = `/post/edit/?id=${postId}`;
    });
  } catch (error) {
    console.error('Error fetching single post:', error);
    document.getElementById('singlePostContainer').innerHTML =
      '<p>Failed to load the post.</p>';
  }
}

if (window.location.pathname === '/post/view/') {
  renderSinglePost();
}
