/**
 * Jest Setup File
 *
 * This module sets up global configurations and mocks for the Jest testing environment.
 * Specifically, it mocks the `window.location` object to prevent actual navigation
 * during tests and allows for controlled manipulation of the location.
 *
 * @module JestSetup
 *
 * @constant {Object} locationMock - A mock object representing the `window.location` property.
 * @property {string} locationMock.href - The current URL as a string.
 * @property {Function} locationMock.assign - A mock function to simulate navigation to a new URL.
 * @property {Function} locationMock.replace - A mock function to simulate replacing the current URL.
 */

Object.defineProperty(window, 'location', {
  value: {
    href: '',
    assign: () => {},
    replace: () => {},
  },
  writable: true,
});
