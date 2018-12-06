context('@andrew-codes/verdigris-hidden', () => {
  before(() => {
    cy.navigate('Layout', 'Hidden');
  });
  it('documentation page contains API section for Analytics components', () => {
    cy.contains('h2', 'Component API')
      .next('[data-component="PropsTable"]')
      .should('exist');
  });
  it('visually hidden items are focus-able', () => {
    cy.get('[data-test="visually-hidden"]')
      .find('a')
      .first()
      .then(el => {
        el.get(0).focus();
      })
      .should('have.css', 'position', 'static');
  });
  it('can be hidden from screen readers', () => {
    cy.get('[data-test="hidden-from-screenreaders"]')
      .find('a')
      .first()
      .children()
      .first()
      .should('have.attr', 'aria-hidden', 'true');
  });
});
