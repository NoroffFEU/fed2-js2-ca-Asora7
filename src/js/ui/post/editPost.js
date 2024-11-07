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

    // Store the original post data to detect changes
    const originalPost = { ...post };

    // Populate the form fields with existing post data
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postBody').value = post.body;
    if (post.media) {
      document.getElementById('postMedia').value = post.media.url;
    }

    // Add event listener for form submission
    const form = document.getElementById('editPostForm');
    const updateButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Collect the updated post data from the form
      const mediaUrl = document.getElementById('postMedia').value.trim();
      const updatedPost = {
        title: document.getElementById('postTitle').value,
        body: document.getElementById('postBody').value,
        tags: [], // Optional: Add tags handling if needed
      };

      if (mediaUrl) {
        updatedPost.media = {
          url: mediaUrl,
          alt: 'Media Description',
        };
      }

      try {
        // Disable the submit button during the update
        updateButton.disabled = true;
        updateButton.textContent = 'Updating...';

        // Attempt to update the post
        const result = await updatePost(postId, updatedPost);
        if (result) {
          // Display the updated post
          displayUpdatedPost(result);

          // Update button text after successful update
          updateButton.textContent = 'Updated';
          updateButton.style.backgroundColor = '#6c757d'; // grey color
        } else {
          console.error('Failed to update post.');
          updateButton.textContent = 'Failed to update';
          updateButton.style.backgroundColor = '#dc3545'; // red for failure
        }
      } catch (error) {
        console.error('Error updating post:', error);

        // Revert button state in case of error
        updateButton.textContent = 'Update Post';
        updateButton.disabled = false;
        updateButton.style.backgroundColor = ''; // default color
      }
    });

    // Event listener to detect changes in the form and reset the button color to blue
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        const isChanged =
          document.getElementById('postTitle').value !== originalPost.title ||
          document.getElementById('postBody').value !== originalPost.body ||
          document.getElementById('postMedia').value.trim() !==
            (originalPost.media ? originalPost.media.url : '');

        if (isChanged) {
          updateButton.disabled = false;
          updateButton.textContent = 'Update Post';
          updateButton.style.backgroundColor = '#007bff'; // blue color for update
        }
      });
    });

    // Add event listener for the delete button
    const deleteButton = document.getElementById('deletePostButton');
    deleteButton.addEventListener('click', async () => {
      const confirmation = confirm(
        'Are you sure you want to delete this post?',
      );
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
    document.getElementById('postContainer').innerHTML =
      '<p>Failed to load post. Please try again later.</p>';
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
  const postContainer = document.getElementById('postContainer');

  postContainer.innerHTML = '';

  const postTitle = document.createElement('h2');
  postTitle.textContent = post.title;

  const postBody = document.createElement('p');
  postBody.textContent = post.body;

  if (post.media) {
    const postMedia = document.createElement('img');
    postMedia.src = post.media.url;
    postMedia.alt = post.media.alt || 'Post Media';
    postContainer.appendChild(postMedia);
  }

  postContainer.appendChild(postTitle);
  postContainer.appendChild(postBody);

  const viewPostButton = document.createElement('button');
  viewPostButton.textContent = 'View in profile';
  viewPostButton.classList.add('view-post-btn');

  viewPostButton.addEventListener('click', () => {
    window.location.href = `/profile/`;
  });

  postContainer.appendChild(viewPostButton);
}

if (window.location.pathname.includes('/post/edit/')) {
  const postId = getUrlParameter('id');

  if (!postId) {
    console.error('No post ID provided in the URL');
  } else {
    renderPostForEditing(postId);
  }
}
