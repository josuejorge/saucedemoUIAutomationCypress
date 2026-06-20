import { loginPage } from '../../pages/LoginPage';
import { homePage } from '../../pages/HomePage';

const VALID_USER     = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const LOCKED_USER    = 'locked_out_user';
const WRONG_PASSWORD = 'wrong_password';

describe('Login Page', () => {
  beforeEach(() => {
    loginPage.navigate();
  });

  it('Validar abrir navegador', () => {
    cy.url().should('include', 'saucedemo.com');
  });

  it('Validar que site abriu com sucesso', () => {
    cy.url().should('eq', 'https://www.saucedemo.com/');
    loginPage.logo.should('be.visible').and('have.text', 'Swag Labs');
    loginPage.usernameInput.should('be.visible');
    loginPage.passwordInput.should('be.visible');
    loginPage.loginButton.should('be.visible');
  });

  it('Validar Login Com Sucesso', () => {
    loginPage.login(VALID_USER, VALID_PASSWORD);
    cy.url().should('include', '/inventory.html');
    homePage.inventoryList.should('be.visible');
  });

  it('Validar Login Com Falha', () => {
    loginPage.login(VALID_USER, WRONG_PASSWORD);
    loginPage.errorMessage
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service');
  });

  it('Validar Login Com Campos Vazios', () => {
    loginPage.loginButton.click();
    loginPage.errorMessage
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('Validar Login Com Usuario Bloqueado', () => {
    loginPage.login(LOCKED_USER, VALID_PASSWORD);
    loginPage.errorMessage
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out');
  });

  it('Validar Logout', () => {
    loginPage.login(VALID_USER, VALID_PASSWORD);
    cy.url().should('include', '/inventory.html');
    homePage.logout();
    cy.url().should('eq', 'https://www.saucedemo.com/');
    loginPage.loginButton.should('be.visible');
  });
});
