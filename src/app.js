import "./css/style.css";
import router from "./js/router";

import "./js/api/auth/register.js";
import "./js/api/auth/login.js"; 
import { logout } from './js/ui/auth/logout.js';  

const logoutButton = document.getElementById('logout');

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

import './js/api/post/create.js'; // API for creating posts

import './js/ui/post/editPost.js';

await router(window.location.pathname);