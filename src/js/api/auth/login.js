console.log("login.js is loaded");

import { API_AUTH_LOGIN } from '../constants.js';  // Import the login endpoint
import { getHeaders } from '../headers.js';  // Import the headers function

// Function to log in a user
export async function loginUser(userData) {
    try {
        console.log("User data being sent:", userData);  // Log user data

        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });

        const data = await response.json();  // Parse the JSON response

        if (!response.ok) {
            throw new Error(`Login failed: ${data.errors[0].message}`);
        }

        console.log('Login successful:', data);

        // Check for accessToken and store it
        if (data.data.accessToken) {
            localStorage.setItem('token', data.data.accessToken);  // Store the token
            console.log('JWT token saved to localStorage:', data.data.accessToken);

            // Store the username (assuming the API response contains it)
            if (data.data.user && data.data.user.username) {
                localStorage.setItem('username', data.data.user.username);  // Store the username
                console.log('Username saved to localStorage:', data.data.user.username);
            } else {
                console.log('No username returned in the response.');
            }

            window.location.href = '/';  // Redirect to homepage or another page
        } else {
            console.log('No token returned in the response.');
        }

        return data;  // Return data for further processing if needed
    } catch (error) {
        console.error('Error during login:', error);
    }
}

// Form submission handler
const loginForm = document.forms['login'];  // Use the form name 'login'

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent form from refreshing the page

        const formData = new FormData(loginForm);  // Get form data

        const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        await loginUser(userData);  // Call the login function with user input
    });
}




