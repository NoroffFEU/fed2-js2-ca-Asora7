import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

// Ensure the user is authenticated
authGuard();

// Get the form and attach the submit event to it
const form = document.forms.createPost;
if (form) {
    form.addEventListener("submit", onCreatePost);
}
