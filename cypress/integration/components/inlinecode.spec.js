/// <reference types="Cypress" />

context('@andrew-codes/verdigris-code', () => {
  before(() => {
    cy.visit('/packages/code/components/inlinecode');
  });
  context('<InlineCode />', () => {
    it('documentation page contains API section for Analytics components', () => {
      cy.contains('h2', 'API')
        .next()
        .find('.PropsTable')
        .should('exist');
    });
    it('can render inline code snippets', () => {
      cy.contains('h2', 'Examples')
        .nextUntil('[data-testid="examples"]')
        .find('[data-component="InlineCode"]')
        .should('have.text', 'ls -a')
        .then(el => expect(el.prop('tagName').toLowerCase()).to.equal('code'));
    });
  });
});
