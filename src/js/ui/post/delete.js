import { deletePost } from '../../api/post/delete.js'; 

/**
 * Handles the deletion of a post when the delete button is clicked.
 *
 * @async
 * @function onDeletePost
 * @param {Event} event - The click event from the delete button.
 * @returns {Promise<void>} A promise that resolves when the post has been deleted.
 */

export async function onDeletePost(event) {
    const postId = event.target.dataset.postId;
    const confirmation = confirm('Are you sure you want to delete this post?');

    if (confirmation) {
        try {
            await deletePost(postId); 
            
            const postElement = document.getElementById(`post-${postId}`); 
            if (postElement) {
                postElement.remove();
            }
            alert('Post deleted successfully.'); 
        } catch (error) {
            console.error('Error deleting post:', error); 
            alert('Failed to delete the post.'); 
        }
    }
}
