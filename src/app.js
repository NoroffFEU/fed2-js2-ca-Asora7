/**
 * Main entry point for the application.
 * 
 * This module initializes the application by importing necessary styles,
 * setting up routing, and creating the application header.
 */

import "./css/style.css";
import router from "./js/router";

import "./js/api/auth/register.js";
import "./js/api/auth/login.js"; 


import './js/api/post/create.js'; 
import './js/ui/post/editPost.js';

import { createHeader } from './js/ui/global/header.js'; // Import the header

/**
 * Initializes the application by creating the header and 
 * setting up the router based on the current URL pathname.
 */

createHeader();

await router(window.location.pathname);