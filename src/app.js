import "./css/style.css";

import router from "./js/router";

import "./js/api/auth/register.js";

import "./js/api/auth/login.js"; 

import { logout } from './js/ui/auth/logout.js';  

const logoutButton = document.getElementById('logout');

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}


import './js/api/post/create.js'


await router(window.location.pathname);
