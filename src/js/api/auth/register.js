
console.log("register.js is loaded");

import { API_AUTH_REGISTER } from '../constants.js';  // Import the register endpoint
import { getHeaders } from '../headers.js';  // Import the headers function

// Function to register a new user
export async function registerUser(userData) {
    try {
        console.log("User data being sent:", userData);  // Log user data

        const response = await fetch(API_AUTH_REGISTER, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();  // Log the error response
            throw new Error(`Failed to register: ${errorData.errors[0].message}`);
        }

        const data = await response.json();
        console.log('Registration successful:', data);

        // Redirect to the login page
        window.location.href = '/auth/login/';  // Adjust the path as needed

        return data;  // Return data for further processing if needed
    } catch (error) {
        console.error('Error during registration:', error);
    }
}


  

// Form submission handler
const registrationForm = document.forms['register'];  // Use the form name 'register'

if (registrationForm) {
  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form from refreshing the page

    const formData = new FormData(registrationForm);  // Get form data

    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    await registerUser(userData);  // Call the register function with user input
  });
}









