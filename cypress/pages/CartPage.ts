class CartPage {
  navigate() {
    cy.get('.shopping_cart_link').click();
  }

  get cartItems() {
    return cy.get('.cart_item');
  }

  get cartItemNames() {
    return cy.get('.cart_item .inventory_item_name');
  }

  get removeButtons() {
    return cy.get('[data-test^="remove"]');
  }

  get checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }

  get continueShoppingButton() {
    return cy.get('[data-test="continue-shopping"]');
  }

  checkout() {
    this.checkoutButton.click();
  }

  removeFirstItem() {
    this.removeButtons.first().click();
  }

  continueShopping() {
    this.continueShoppingButton.click();
  }
}

export const cartPage = new CartPage();
