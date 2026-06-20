import { homePage } from '../../pages/HomePage';
import { productPage } from '../../pages/ProductPage';

describe('Cards / Produtos', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Validar Card de produto na home', () => {
    homePage.productNames.first().should('be.visible');
    homePage.productPrices.first().should('be.visible').invoke('text').should('match', /^\$\d+\.\d{2}$/);
    homePage.productImages.first().should('be.visible');
    homePage.addToCartButtons.first().should('be.visible').and('contain.text', 'Add to cart');
  });

  it('Validar adicionar produto ao carrinho', () => {
    homePage.addToCartButtons.first().click();
    homePage.cartBadge.should('be.visible').and('have.text', '1');
    homePage.removeFromCartButtons.first().should('be.visible');
  });

  it('Validar adicionar multiplos produtos ao carrinho', () => {
    homePage.addToCartButtons.first().click();
    homePage.cartBadge.should('have.text', '1');
    homePage.addToCartButtons.first().click();
    homePage.cartBadge.should('have.text', '2');
  });

  it('Validar remover produto do carrinho', () => {
    homePage.addToCartButtons.first().click();
    homePage.cartBadge.should('have.text', '1');
    homePage.removeFromCartButtons.first().click();
    homePage.cartBadge.should('not.exist');
    homePage.addToCartButtons.first().should('be.visible');
  });

  it('Validar detalhes do produto', () => {
    homePage.productNames.first().click();
    cy.url().should('include', '/inventory-item.html');
    productPage.productName.should('be.visible');
    productPage.productDescription.should('be.visible');
    productPage.productPrice.should('be.visible').invoke('text').should('match', /^\$\d+\.\d{2}$/);
    productPage.productImage.should('be.visible');
  });

  it('Validar botao back to products', () => {
    homePage.productNames.first().click();
    cy.url().should('include', '/inventory-item.html');
    productPage.goBackToProducts();
    cy.url().should('include', '/inventory.html');
    homePage.inventoryItems.first().should('be.visible');
  });

  it('Validar adicionar produto dentro da tela de detalhes', () => {
    homePage.productNames.first().click();
    cy.url().should('include', '/inventory-item.html');
    productPage.addToCart();
    homePage.cartBadge.should('be.visible').and('have.text', '1');
    productPage.removeFromCartButton.should('be.visible');
  });
});
