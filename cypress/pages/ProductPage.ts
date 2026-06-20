class ProductPage {
  get productName() {
    return cy.get('.inventory_details_name');
  }

  get productDescription() {
    return cy.get('.inventory_details_desc');
  }

  get productPrice() {
    return cy.get('.inventory_details_price');
  }

  get productImage() {
    return cy.get('img.inventory_details_img');
  }

  get addToCartButton() {
    return cy.get('[data-test^="add-to-cart"]');
  }

  get removeFromCartButton() {
    return cy.get('[data-test^="remove"]');
  }

  get backToProductsButton() {
    return cy.get('[data-test="back-to-products"]');
  }

  addToCart() {
    this.addToCartButton.click();
  }

  goBackToProducts() {
    this.backToProductsButton.click();
  }
}

export const productPage = new ProductPage();
