/**
 * @module profile
 * 
 * This module manages the user profile view. It ensures that the user 
 * is authenticated before allowing access to the profile and displays 
 * the user's posts.
 */

import { authGuard } from "../../utilities/authGuard";
import '../../ui/profile/displayPosts.js';

authGuard();
