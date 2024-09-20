import "./css/style.css";

import router from "./js/router";

import "./js/api/auth/register.js";

import "./js/api/auth/login.js"; 

await router(window.location.pathname);
