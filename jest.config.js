/**
 * Jest Configuration File
 *
 * This module exports the configuration settings for Jest testing framework.
 * It specifies the testing environment, file extensions, transformation settings,
 * and setup files required for the testing process.
 *
 * @module JestConfig
 *
 * @property {string} testEnvironment - The environment in which to run the tests (e.g., 'jsdom').
 * @property {Array<string>} moduleFileExtensions - The list of file extensions Jest will recognize.
 * @property {Object} transform - The transformation settings for file types.
 * @property {string} transform- ['^.+\\.jsx?$'] - The regex pattern to match JavaScript files for transformation.
 * @property {string} setupFiles - The path to the setup file that will run before tests.
 * @property {Array<string>} testPathIgnorePatterns - Array of paths that Jest should ignore when running tests.
 */

export default {
  testEnvironment: 'jsdom', // Specifies 'jsdom' as the testing environment
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'], // Recognized file extensions
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transforms JavaScript and JSX files using Babel
  },
  setupFiles: ['./jest.setup.js'], // Path to the setup file
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'], // Ignore Cypress test files
};
