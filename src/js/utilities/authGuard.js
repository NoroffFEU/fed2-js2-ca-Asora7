/**
 * Authenticates the user by checking if they are logged in.
 * If the user is not logged in, they will be alerted and redirected 
 * to the login page.
 *
 * @function authGuard
 * @returns {void} No return value.
 * @throws {void} No exceptions are thrown.
 */

export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}
