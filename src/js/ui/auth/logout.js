/**
 * Logs out the current user by removing the JWT token and username from localStorage.
 * Redirects the user to the login page after logging out.
 *
 * @function logout
 * @returns {void} This function does not return a value.
 */

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  
    window.location.href = '/auth/login/';
  }
