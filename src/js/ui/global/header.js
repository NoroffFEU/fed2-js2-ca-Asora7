import { logout } from '../auth/logout.js';

/**
 * Creates the global header for the application.
 * This function constructs the header element containing navigation links
 * and a logout button, and appends it to the document body.
 *
 * @function createHeader
 * @returns {void} This function does not return a value.
 *
 * @description
 * The header includes links to the home page, user profile, and post creation.
 * It also features a logout button that prompts the user for confirmation
 * before calling the logout function. A message display area is included
 * for showing any relevant messages to the user.
 */
export function createHeader() {
  const header = document.createElement('header');
  header.innerHTML = `
    <nav>
      <a href="/">Home</a>
      <a href="/profile/">My profile</a>
      <a href="/post/create/">Post</a>
      <button id="logout">Logout</button> <!-- Logout button -->
    </nav>
    <div id="message" style="color: green;"></div> <!-- Message display area -->
  `;

  document.body.prepend(header);

  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      const confirmation = confirm('Are you sure you want to log out?');
      if (confirmation) {
        logout();
      }
    });
  }
}
