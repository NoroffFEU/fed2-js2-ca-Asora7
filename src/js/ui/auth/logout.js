export function logout() {
    // Remove the JWT token from localStorage
    localStorage.removeItem('token');
  
    // Redirect the user to the login page
    window.location.href = '/auth/login/index.html';
  }
