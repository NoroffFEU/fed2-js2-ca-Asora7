/**
 * @module register
 * 
 * This module manages the user registration view. It sets up an event listener 
 * for the registration form and handles user registration upon form submission.
 */

import { onRegister } from "../../ui/auth/register";

const form = document.forms.register;

form.addEventListener("submit", onRegister);
