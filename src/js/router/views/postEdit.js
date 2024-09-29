/**
 * @module postEdit
 * 
 * This module manages the editing of an existing post. It ensures that 
 * the user is authenticated before allowing access to the edit functionality.
 */

import { authGuard } from "../../utilities/authGuard";

authGuard();