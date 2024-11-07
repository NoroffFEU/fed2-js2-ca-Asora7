import { fetchUserPosts } from '../../api/profile/read.js';

/**
 * Renders the user's posts by fetching them from the API and updating the DOM.
 *
 * @async
 * @function renderUserPosts
 * @throws {Error} If the fetched posts are not an array or if there is an error while fetching posts.
 */
async function renderUserPosts() {
  const postContainer = document.getElementById('postContainer');

  try {
    const posts = await fetchUserPosts();

    if (!Array.isArray(posts)) {
      throw new Error('Fetched posts is not an array');
    }

    postContainer.innerHTML = '';

    if (posts.length === 0) {
      postContainer.innerHTML = '<p>No posts found.</p>';
      return;
    }

    posts.forEach((post) => {
      const postCol = document.createElement('div');
      postCol.classList.add('col');

      const postLink = document.createElement('a');
      postLink.href = `/post/view/?id=${post.id}`;
      postLink.classList.add('text-decoration-none');

      const card = document.createElement('div');
      card.classList.add('card', 'h-100');

      if (post.media) {
        const postMedia = document.createElement('img');
        postMedia.src = post.media.url;
        postMedia.alt = post.media.alt || 'Media';
        postMedia.classList.add('card-img-top');
        card.appendChild(postMedia);
      }

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const postTitle = document.createElement('h5');
      postTitle.classList.add('card-title');
      postTitle.textContent = post.title;

      cardBody.appendChild(postTitle);

      card.appendChild(cardBody);

      postLink.appendChild(card);

      postCol.appendChild(postLink);

      postContainer.appendChild(postCol);
    });
  } catch (error) {
    console.error('Error loading user posts:', error);
    postContainer.innerHTML =
      '<p>Failed to load posts. Please try again later.</p>';
  }
}

renderUserPosts();
