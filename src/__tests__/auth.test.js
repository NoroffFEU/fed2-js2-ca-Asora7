import jest from 'jest-mock';
import { onLogin } from '../js/ui/auth/login';
import { logout } from '../js/ui/auth/logout';

/**
 * @module AuthenticationTests
 *
 * This module contains tests for authentication functionalities,
 * specifically for user login and logout processes.
 */
describe('Authentication Tests', () => {
  /**
   * Runs before each test to set up the initial state.
   * Clears the localStorage to ensure a fresh environment for each test.
   *
   * @function beforeEach
   */
  beforeEach(() => {
    localStorage.clear();
  });

  /**
   * Tests the onLogin function to ensure it stores a token
   * in localStorage when provided with valid credentials.
   *
   * @test
   *
   * @example
   * const mockUserData = { email: 'test@example.com', password: 'password' };
   * const mockToken = 'mock-jwt-token';
   *
   * @assert
   * - The token should be stored in localStorage.
   * - The username should be stored in localStorage.
   */
  test('onLogin stores a token when provided with valid credentials', async () => {
    const mockUserData = { email: 'test@example.com', password: 'password' };
    const mockToken = 'mock-jwt-token';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: { accessToken: mockToken, name: 'Test User' },
          }),
      })
    );

    document.body.innerHTML = `<form name="login">
      <input name="email" value="${mockUserData.email}" />
      <input name="password" value="${mockUserData.password}" />
      <button type="submit">Login</button>
    </form>`;

    await onLogin(new Event('submit', { bubbles: true }));

    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(localStorage.getItem('username')).toBe('Test User');
  });

  /**
   * Tests the logout function to ensure it clears the token
   * and username from localStorage.
   *
   * @test
   *
   * @assert
   * - The token should be removed from localStorage.
   * - The username should be removed from localStorage.
   */
  test('logout clears the token from localStorage', () => {
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('username', 'Test User');

    logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
  });
});
