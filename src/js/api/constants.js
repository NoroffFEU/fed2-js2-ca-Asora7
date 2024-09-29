/**
 * @module constants
 * 
 * This module contains API-related constants used throughout the application.
 */

/**
 * API key used for authenticating requests.
 * 
 * @constant {string}
 * @default "251b33b5-1499-4de0-9aab-824284cb9b87"
 */
export const API_KEY = "251b33b5-1499-4de0-9aab-824284cb9b87";

/**
 * Base URL for the API.
 * 
 * @constant {string}
 * @default "https://v2.api.noroff.dev"
 */
export const API_BASE = "https://v2.api.noroff.dev";

/**
 * Endpoint for authentication.
 * 
 * @constant {string}
 */
export const API_AUTH = `${API_BASE}/auth`;

/**
 * Endpoint for user login.
 * 
 * @constant {string}
 */
export const API_AUTH_LOGIN = `${API_AUTH}/login`;

/**
 * Endpoint for user registration.
 * 
 * @constant {string}
 */
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

/**
 * Endpoint for creating an API key.
 * 
 * @constant {string}
 */
export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

/**
 * Base URL for social-related operations.
 * 
 * @constant {string}
 */
export const API_SOCIAL = `${API_BASE}/social`;

/**
 * Endpoint for posts.
 * 
 * @constant {string}
 */
export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

/**
 * Endpoint for user profiles.
 * 
 * @constant {string}
 */
export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

