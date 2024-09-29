/**
 * @module login
 * 
 * This module handles the login functionality for the application.
 * It listens for the login form submission and triggers the login process.
 */

import { onLogin } from "../../ui/auth/login";

const form = document.forms.login;

form.addEventListener("submit", onLogin);
