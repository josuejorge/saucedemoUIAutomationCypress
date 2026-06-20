import { homePage } from '../../pages/HomePage';

describe('Home Page', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Validar Homepage', () => {
    cy.url().should('include', '/inventory.html');
    homePage.inventoryList.should('be.visible');
    homePage.inventoryItems.should('have.length', 6);
  });

  it('Validar Card De Produto Na Home', () => {
    homePage.productNames.first().should('be.visible');
    homePage.productPrices.first().should('be.visible').invoke('text').should('match', /^\$\d+\.\d{2}$/);
    homePage.productImages.first().should('be.visible');
    homePage.addToCartButtons.first().should('be.visible').and('contain.text', 'Add to cart');
  });

  it('Validar about', () => {
    homePage.openMenu();
    homePage.aboutLink
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'saucelabs.com');
  });

  it('Validar all items', () => {
    homePage.openMenu();
    homePage.allItemsLink.should('be.visible').click();
    cy.url().should('include', '/inventory.html');
    homePage.inventoryItems.first().should('be.visible');
  });

  it('Validar Carrinho persistido após reload na tela', () => {
    homePage.addFirstItemToCart();
    homePage.cartBadge.should('have.text', '1');
    cy.reload();
    homePage.cartBadge.should('be.visible').and('have.text', '1');
  });

  it('Validar ordenar produtos Name (A to Z)', () => {
    homePage.selectSort('az');
    homePage.getProductNames().then(names => {
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sorted);
    });
  });

  it('Validar ordenar produtos Name (Z to A)', () => {
    homePage.selectSort('za');
    homePage.getProductNames().then(names => {
      const sorted = [...names].sort((a, b) => b.localeCompare(a));
      expect(names).to.deep.equal(sorted);
    });
  });

  it('Validar ordenar produtos Price (Low to High)', () => {
    homePage.selectSort('lohi');
    homePage.getProductPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('Validar ordenar produtos Price (High to Low)', () => {
    homePage.selectSort('hilo');
    homePage.getProductPrices().then(prices => {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sorted);
    });
  });
});
