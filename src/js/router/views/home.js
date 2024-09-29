/**
 * @module home
 * 
 * This module represents the home view of the application.
 * It ensures that the user is authenticated by invoking the authGuard function.
 */

import { authGuard } from "../../utilities/authGuard";

authGuard();
