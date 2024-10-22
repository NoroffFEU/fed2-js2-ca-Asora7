/**
 * @module home
 *
 * This module represents the home view of the application.
 * It ensures that the user is authenticated by invoking the authGuard function.
 */

import { authGuard } from '../../utilities/authGuard';

/**
 * Calls the authGuard function to verify if the user is authenticated.
 * If the user is authenticated, a welcome message is displayed.
 *
 * @function
 */

authGuard();

/**
 * Retrieves the authentication token from localStorage.
 * If the token exists, a welcome message is displayed to the user.
 */

const token = localStorage.getItem('token');

if (token) {
  const welcomeMessageDiv = document.getElementById('welcomeMessage');
  welcomeMessageDiv.innerText = 'Welcome back!';
  welcomeMessageDiv.style.display = 'block';
}
