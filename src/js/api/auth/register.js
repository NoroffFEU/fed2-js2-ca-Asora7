import { API_AUTH_REGISTER } from '../constants.js';
import { getHeaders } from '../headers.js';

// Function to handle user registration
export async function registerUser(username, email, password) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    console.log('User registered successfully:', data);

    // Assuming the JWT token is included in the response (adjust if needed)
    const token = data.token; // Change this if the token is in a different property

    // Store the token in localStorage
    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token stored in localStorage');
    }

    // Optionally redirect the user to the login page after registration
    // window.location.href = '/auth/login/'; // Uncomment if you want to redirect

  } catch (error) {
    console.error('Error during registration:', error);
  }
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.forms['register'];

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the form values
    const username = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Call the registerUser function and pass the form values
    await registerUser(username, email, password);

    // Optionally redirect or show a message after registration
    // window.location.href = '/auth/login/'; // Uncomment to redirect to login after success
  });
});


