import { updatePost } from '../../api/post/update.js';

/**
 * Handles the submission of the post update form.
 *
 * @async
 * @function onUpdatePost
 * @param {Event} event - The submit event triggered by the form.
 * @throws {Error} If the post update fails, it will log the error to the console.
 * TODO: Use updatedPost to update the UI or provide feedback to the user.
 */

export async function onUpdatePost(event) {
  event.preventDefault();

  const postId = event.target.dataset.postId;
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const media = document.getElementById('post-media').value;

  const postData = { title, body, media };

  try {
    const updatedPost = await updatePost(postId, postData);
    console.log('Post updated successfully:', updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

document
  .getElementById('update-post-form')
  .addEventListener('submit', onUpdatePost);
