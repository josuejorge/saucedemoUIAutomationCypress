class LoginPage {
  private readonly url = '/';

  navigate() {
    cy.visit(this.url);
  }

  get logo() {
    return cy.get('.login_logo');
  }

  get usernameInput() {
    return cy.get('#user-name');
  }

  get passwordInput() {
    return cy.get('#password');
  }

  get loginButton() {
    return cy.get('#login-button');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  login(username: string, password: string) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
  }
}

export const loginPage = new LoginPage();
