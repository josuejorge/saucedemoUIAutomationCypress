import { loginPage } from '../../pages/LoginPage';

describe('Login Page', () => {
  beforeEach(() => {
    loginPage.navigate();
  });

  it('Validar que site abre com sucesso', () => {
    cy.url().should('eq', 'https://www.saucedemo.com/');
    loginPage.logo.should('be.visible').and('have.text', 'Swag Labs');
    loginPage.usernameInput.should('be.visible');
    loginPage.passwordInput.should('be.visible');
    loginPage.loginButton.should('be.visible');
  });
});
