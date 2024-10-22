/**
 * ESLint Configuration
 *
 * This module exports an array containing ESLint configuration settings.
 * It defines the language options, including global variables for browser
 * and Jest environments, as well as recommended settings from the ESLint
 * JavaScript plugin.
 *
 * @module ESLintConfig
 *
 * @type {Array<Object>}
 * @property {Object} languageOptions - Configuration options for the language.
 * @property {Object} languageOptions.globals - Global variables available in the environment.
 * @property {Object} pluginJs.configs.recommended - Recommended ESLint rules from the @eslint/js plugin.
 */

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.cypress, // Include Cypress globals
        global: 'readonly',
      },
    },
  },
  {
    plugins: {
      cypress: pluginCypress, // Define the Cypress plugin here
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.spec.js', '**/*.test.js', '**/cypress/**/*.js'], // Patterns for test files and Cypress support files
    rules: {
      'no-undef': 'off', // Disable no-undef for test files and Cypress files
    },
  },
];
