import { authGuard } from "../../utilities/authGuard";
import '../../ui/profile/displayPosts.js';

// Ensure user is authenticated before displaying profile
authGuard();
