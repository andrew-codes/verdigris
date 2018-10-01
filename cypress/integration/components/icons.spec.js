/// <reference types="Cypress" />

context('@andrew-codes/verdigris-icons', () => {
  before(() => {
    cy.visit('/packages/icons');
  });
  it('documentation page contains API section for Icon components', () => {
    cy.contains('h2', 'API')
      .next()
      .find('.PropsTable')
      .should('exist');
  });
  it('icon default props', () => {
    cy.contains('h2', 'Examples')
      .siblings('[data-testid="examples"]')
      .find('[data-component="SvgIcon"]')
      .first()
      .should('have.css', 'width', '16px')
      .should('have.css', 'height', '16px')
      .should('have.css', 'fill', 'rgb(0, 0, 0)');
  });
  it('icons can be colored', () => {
    cy.contains('h2', 'Examples')
      .siblings('[data-testid="examples"]')
      .find('[data-component="SvgIcon"]')
      .then(els => els[2])
      .should('have.css', 'fill', 'rgb(0, 169, 224)')
      .next()
      .should('have.css', 'fill', 'rgb(0, 128, 0)');
  });
  it('icon be sized', () => {
    cy.contains('h2', 'Examples')
      .siblings('[data-testid="examples"]')
      .find('[data-component="SvgIcon"]')
      .then(els => els[1])
      .should('have.css', 'width', '32px')
      .should('have.css', 'height', '32px');
  });
});
