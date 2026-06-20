import users from '../fixtures/users.json';

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (
  username = users.validUser.username,
  password = users.validUser.password,
) => {
  cy.visit('/');
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
  cy.url().should('include', '/inventory.html');
});
