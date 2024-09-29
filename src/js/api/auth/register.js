import { API_AUTH_REGISTER } from '../constants.js';  
import { getHeaders } from '../headers.js';  


/**
 * Registers a new user by sending their data to the authentication API.
 * If successful, redirects the user to the login page.
 * 
 * @async
 * @function registerUser
 * @param {Object} userData - The user's registration data, including name, email, and password.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<Object>} The response data from the API if registration is successful.
 * @throws {Error} Throws an error if registration fails or the API returns a non-200 status.
 */

export async function registerUser(userData) {
    try {

        const response = await fetch(API_AUTH_REGISTER, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();  
            throw new Error(`Failed to register: ${errorData.errors[0].message}`);
        }

        const data = await response.json();

        window.location.href = '/auth/login/';  

        return data;  
    } catch (error) {
        console.error('Error during registration:', error);
    }
}
  
/**
 * Handles the form submission for the registration form.
 * Gathers form data and calls the registerUser function.
 * 
 * @function
 * @param {Event} event - The form submission event.
 */

const registrationForm = document.forms['register'];  

if (registrationForm) {
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();  

    const formData = new FormData(registrationForm);  

    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    await registerUser(userData);  
  });
}









