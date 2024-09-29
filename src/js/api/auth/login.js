import { API_AUTH_LOGIN } from '../constants.js';  
import { getHeaders } from '../headers.js';  

/**
 * Logs in a user by sending the user data to the authentication API.
 * If successful, stores the JWT token and username in localStorage.
 * 
 * @async
 * @function loginUser
 * @param {Object} userData - The user's login data, including email and password.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @returns {Promise<Object>} The response data from the API if successful.
 * @throws {Error} Throws an error if the login fails or the API returns a non-200 status.
 */
export async function loginUser(userData) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });

        const data = await response.json();  
        
        if (!response.ok) {
            throw new Error(`Login failed: ${data.errors[0].message}`);
        }

        if (data.data.accessToken) {
            localStorage.setItem('token', data.data.accessToken); 

            if (data.data.name) {  
                localStorage.setItem('username', data.data.name);  
            } 

            window.location.href = '/';  
        }

        return data;  
    } catch (error) {
        console.error('Error during login:', error);
        alert(error.message);
    }
}
