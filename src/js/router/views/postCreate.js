/**
 * @module postCreate
 * 
 * This module handles the creation of a new post by providing a form 
 * for the user to fill out. It ensures that the user is authenticated 
 * before allowing access to the form.
 */

import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createPost;
if (form) {
    form.addEventListener("submit", onCreatePost);
}
