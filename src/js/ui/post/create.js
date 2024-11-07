import { createPost } from '../../api/post/create.js';

/**
 * Handles the form submission for creating a post.
 * Gathers form data, calls the createPost API function, and updates the UI to show the created post.
 * Disables the submission button after a successful post to prevent duplicate submissions.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the post creation and UI update are complete.
 */
export async function onCreatePost(event) {
  event.preventDefault();

  const createPostButton = document.getElementById('createPostButton');

  const formData = new FormData(event.target);
  const postData = {
    title: formData.get('title'),
    body: formData.get('body'),
    tags: formData.get('tags')
      ? formData
          .get('tags')
          .split(',')
          .map((tag) => tag.trim())
      : undefined,
    media: formData.get('media')
      ? { url: formData.get('media'), alt: '' }
      : null,
  };

  const createdPost = await createPost(postData);

  if (createdPost) {
    localStorage.setItem('latestPost', JSON.stringify(createdPost.data));
    displayCreatedPost(createdPost);

    createPostButton.textContent = 'Post Created';
    createPostButton.classList.add('btn-secondary');
    createPostButton.classList.remove('btn-primary');
    createPostButton.disabled = true;
  }
}

/**
 * Displays the created post on the page below the form.
 * Creates and appends elements to show the post's title, body, media (if available), and tags (if provided).
 * Includes a button to view the post in the profile section.
 *
 * @function displayCreatedPost
 * @param {Object} post - The created post data.
 * @param {Object} post.data - The post's data object containing details about the post.
 * @param {string} post.data.title - The title of the post.
 * @param {string} post.data.body - The body text of the post.
 * @param {Object|null} [post.data.media] - The media object associated with the post, or null if none.
 * @param {string} [post.data.media.url] - The URL of the media file.
 * @param {string} [post.data.media.alt] - Alternative text for the media.
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
