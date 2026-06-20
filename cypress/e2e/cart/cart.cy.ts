import { homePage } from '../../pages/HomePage';
import { cartPage } from '../../pages/CartPage';
import { checkoutPage } from '../../pages/CheckoutPage';

const VALID_USER     = 'standard_user';
const VALID_PASSWORD = 'secret_sauce';
const FIRST_NAME     = 'John';
const LAST_NAME      = 'Doe';
const ZIP_CODE       = '12345';

describe('Cart / Checkout', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#user-name').type(VALID_USER);
    cy.get('#password').type(VALID_PASSWORD);
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
    homePage.addFirstItemToCart();
  });

  it('Validar carrinho', () => {
    cartPage.navigate();
    cy.url().should('include', '/cart.html');
    cartPage.cartItems.should('have.length', 1);
    cartPage.cartItemNames.first().should('be.visible');
    cartPage.checkoutButton.should('be.visible');
    cartPage.continueShoppingButton.should('be.visible');
  });

  it('Validar checkout sem informacao', () => {
    cartPage.navigate();
    cartPage.checkout();
    cy.url().should('include', '/checkout-step-one.html');
    checkoutPage.continue();
    checkoutPage.errorMessage
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });

  it('Validar compra completa de produto', () => {
    cartPage.navigate();
    cartPage.checkout();
    cy.url().should('include', '/checkout-step-one.html');
    checkoutPage.fillInfo(FIRST_NAME, LAST_NAME, ZIP_CODE);
    checkoutPage.continue();
    cy.url().should('include', '/checkout-step-two.html');
    checkoutPage.orderItems.should('have.length', 1);
    checkoutPage.finish();
    cy.url().should('include', '/checkout-complete.html');
    checkoutPage.completeHeader
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
  });

  it('Validar remover pedido do carrinho', () => {
    cartPage.navigate();
    cartPage.cartItems.should('have.length', 1);
    cartPage.removeFirstItem();
    cartPage.cartItems.should('have.length', 0);
    homePage.cartBadge.should('not.exist');
  });

  it('Validar cancelar compra de produto', () => {
    cartPage.navigate();
    cartPage.checkout();
    cy.url().should('include', '/checkout-step-one.html');
    checkoutPage.cancel();
    cy.url().should('include', '/cart.html');
    cartPage.cartItems.should('have.length', 1);
  });
});
