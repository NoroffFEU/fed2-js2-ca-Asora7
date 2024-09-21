import { API_KEY } from './constants.js';  // Import API_KEY from constants.js

// Function to create headers, including the JWT token if available
export function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',  // Specify JSON content type
    'X-Noroff-API-Key': API_KEY,  // Include the API key
  };

  // Get the token from localStorage if it exists
  const token = localStorage.getItem('token');

  // If a token is found, include the Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}
