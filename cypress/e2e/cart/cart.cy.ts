import { homePage } from '../../pages/HomePage';
import { cartPage } from '../../pages/CartPage';
import { checkoutPage } from '../../pages/CheckoutPage';
import checkout from '../../fixtures/checkout.json';

describe('Cart / Checkout', () => {
  beforeEach(() => {
    cy.login();
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
    checkoutPage.fillInfo(
      checkout.validInfo.firstName,
      checkout.validInfo.lastName,
      checkout.validInfo.postalCode,
    );
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
