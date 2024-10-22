/**
 * @module UserAuthenticationTests
 *
 * This module contains tests for user authentication functionalities,
 * including login and logout processes.
 */

describe('User Authentication', () => {
  /**
   * Runs before each test to set up the initial state.
   * Visits the login page to ensure a fresh start for each test.
   *
   * @function beforeEach
   */
  beforeEach(() => {
    cy.visit('/auth/login/');
  });

  /**
   * Tests if the user can log in with valid credentials.
   *
   * @test
   *
   * @example
   * const email = 'asora97@stud.noroff.no';
   * const password = 'Lillivennen1';
   *
   * @assert
   * - The user should be redirected to the home page.
   * - A welcome message should be displayed.
   */
  it('should allow the user to log in with valid credentials', () => {
    cy.get('#email').type('asora97@stud.noroff.no');
    cy.get('#password').type('Lillivennen1');
    cy.get('form').submit();

    cy.url().should('include', '/');
    cy.contains('Welcome back!');
  });

  /**
   * Tests if the user cannot log in with invalid credentials.
   *
   * @test
   *
   * @example
   * const email = 'invalid@user.com';
   * const password = 'invalidPassword';
   *
   * @assert
   * - An alert should be shown with the message "Login failed: Invalid email or password".
   */
  it('should not allow the user to log in with invalid credentials', () => {
    cy.get('#email').type('invalid@user.com');
    cy.get('#password').type('invalidPassword');
    cy.get('form').submit();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Login failed: Invalid email or password');
    });
  });

  /**
   * Tests if the user can log out successfully.
   *
   * @test
   *
   * @example
   * // Valid credentials for login
   * const email = 'asora97@stud.noroff.no';
   * const password = 'Lillivennen1';
   *
   * @assert
   * - The user should be redirected to the login page after logging out.
   */

  it('should allow the user to log out', () => {
    cy.get('#email').type('asora97@stud.noroff.no');
    cy.get('#password').type('Lillivennen1');
    cy.get('form').submit();

    cy.url().should('include', '/');

    cy.get('#logout').click();
    cy.on('window:confirm', () => true);

    cy.url().should('include', '/auth/login/');
  });
});
