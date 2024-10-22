/**
 * Custom command to log in a user.
 *
 * This command sends a POST request to the login endpoint with the user's email and password.
 * If the login is successful, it stores the JWT token in localStorage for future authentication.
 *
 * @function login
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<void>} A promise that resolves when the login request is completed.
 * @throws {Error} Throws an error if the login request fails or the response does not contain a token.
 */

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'https://v2.api.noroff.dev/auth/login',
    body: { email, password },
  }).then((response) => {
    window.localStorage.setItem('jwt', response.body.token);
  });
});
