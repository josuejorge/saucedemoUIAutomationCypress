class HomePage {
  get menuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  get logoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  get aboutLink() {
    return cy.get('#about_sidebar_link');
  }

  get allItemsLink() {
    return cy.get('#inventory_sidebar_link');
  }

  get inventoryList() {
    return cy.get('.inventory_list');
  }

  get inventoryItems() {
    return cy.get('.inventory_item');
  }

  get productNames() {
    return cy.get('.inventory_item_name');
  }

  get productPrices() {
    return cy.get('.inventory_item_price');
  }

  get productImages() {
    return cy.get('.inventory_item_img img');
  }

  get addToCartButtons() {
    return cy.get('[data-test^="add-to-cart"]');
  }

  get removeFromCartButtons() {
    return cy.get('[data-test^="remove"]');
  }

  get cartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  get sortDropdown() {
    return cy.get('[data-test="product-sort-container"]');
  }

  openMenu() {
    this.menuButton.click();
  }

  logout() {
    this.openMenu();
    this.logoutLink.click();
  }

  selectSort(option: 'az' | 'za' | 'lohi' | 'hilo') {
    this.sortDropdown.select(option);
  }

  addFirstItemToCart() {
    this.addToCartButtons.first().click();
  }

  getProductNames(): Cypress.Chainable<string[]> {
    return cy.get('.inventory_item_name').then($els =>
      [...$els].map(el => el.textContent?.trim() ?? '')
    );
  }

  getProductPrices(): Cypress.Chainable<number[]> {
    return cy.get('.inventory_item_price').then($els =>
      [...$els].map(el => parseFloat(el.textContent?.replace('$', '') ?? '0'))
    );
  }
}

export const homePage = new HomePage();
