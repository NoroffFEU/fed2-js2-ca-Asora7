import { API_KEY } from './constants.js';  // Import API_KEY from constants.js

// Function to create standard headers
export function getHeaders() {
  return {
    'Content-Type': 'application/json',  // Telling the API we're sending JSON data
    'X-Noroff-API-Key': API_KEY,  // Include the API key in the headers
  };
}

// Function to create headers with JWT token after login
export function getAuthHeaders(token) {
  return {
    'Content-Type': 'application/json',  // Same content type
    'X-Noroff-API-Key': API_KEY,  // API key
    'Authorization': `Bearer ${token}`  // JWT token for authenticated requests
  };
}

