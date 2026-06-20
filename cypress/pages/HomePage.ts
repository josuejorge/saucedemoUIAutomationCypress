class HomePage {
  get menuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  get logoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  get inventoryList() {
    return cy.get('.inventory_list');
  }

  logout() {
    this.menuButton.click();
    this.logoutLink.click();
  }
}

export const homePage = new HomePage();
