class CheckoutPage {
  get firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  get lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  get continueButton() {
    return cy.get('[data-test="continue"]');
  }

  get cancelButton() {
    return cy.get('[data-test="cancel"]');
  }

  get finishButton() {
    return cy.get('[data-test="finish"]');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  get orderItems() {
    return cy.get('.cart_item');
  }

  get completeHeader() {
    return cy.get('.complete-header');
  }

  fillInfo(firstName: string, lastName: string, postalCode: string) {
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.postalCodeInput.type(postalCode);
  }

  continue() {
    this.continueButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }

  finish() {
    this.finishButton.click();
  }
}

export const checkoutPage = new CheckoutPage();
