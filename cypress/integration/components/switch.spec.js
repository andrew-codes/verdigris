context('@andrew-codes/verdigris-switch', () => {
  context('<Switch />', () => {
    before(() => {
      cy.visit('/packages/selection/components/switch');
    });
    it('contains an API section in the docs', () => {
      cy.contains('h2', 'Component API')
        .next()
        .find('.PropsTable')
        .should('exist');
      cy.contains('h2', 'Theme API')
        .next()
        .find('.PropsTable')
        .should('exist');
    });
    it('can render a switch that is not checked', () => {
      cy.contains('h2', 'Examples')
        .siblings('[data-testid="examples"]')
        .find('[data-component="Switch"]')
        .first()
        .find('input')
        .should('have.value', 'false');
    });
    it('can render a switch that is checked', () => {
      cy.contains('h2', 'Examples')
        .siblings('[data-testid="examples"]')
        .find('[data-component="Switch"]')
        .then(els => els[2])
        .find('input')
        .should('have.value', 'true');
    });
    it('does not visibly show the checkbox input control', () => {
      cy.contains('h2', 'Examples')
        .siblings('[data-testid="examples"]')
        .find('[data-component="Switch"]')
        .first()
        .find('input')
        .should('have.css', 'display', 'none');
    });
    it('properly renders a label to the right of the switch', () => {
      cy.contains('h2', 'Examples')
        .siblings('[data-testid="examples"]')
        .find('[data-component="Switch"]')
        .then(els => els[1])
        .find('div')
        .first()
        .siblings('span')
        .first()
        .contains('check this out')
        .should('exist');
    });
  });
});
