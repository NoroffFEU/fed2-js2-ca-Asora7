import { registerUser } from '../../api/auth/register.js'; // Import the registration function

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
    // Redirect or clear the form as needed
  } catch (error) {
    alert('Registration failed: ' + error.message);
  }
});
