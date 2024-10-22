/**
 * Cypress Configuration
 *
 * This module exports the configuration settings for Cypress End-to-End (E2E) tests.
 *
 * @module CypressConfig
 *
 * @typedef {Object} CypressConfig
 * @property {Object} e2e - End-to-End testing configuration.
 * @property {string} e2e.baseUrl - The base URL for the application under test.
 * @property {string} e2e.supportFile - The path to the support file for E2E tests.
 * @property {string} e2e.specPattern - The pattern used to locate test specification files.
 *
 * @type {CypressConfig}
 */

export default {
  e2e: {
    baseUrl: 'http://localhost:5173/',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
};
