import { registerUser } from '../../api/auth/register.js'; 

/**
 * Handles the registration form submission.
 * This function is triggered when the registration form is submitted.
 *
 * @function
 * @param {Event} event - The event object representing the form submission event.
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 */

document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = {
    name,
    email,
    password
  };

  try {
    await registerUser(userData);
    alert('Registration successful!');

  } catch (error) {
    alert('Registration failed: ' + error.message);
  }
});
