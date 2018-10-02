context('@andrew-codes/verdigris-docz', () => {
  context('PropsTable', () => {
    it('excludes propType createAnalyticsEvent from component documentation', () => {
      cy.visit('/packages/chip/components/chip')
        .contains('h2', 'Component API')
        .next()
        .find('.PropsTable')
        .as('table')
        .should('exist')
        .find('createAnalyticsEvent')
        .should('not.exist');
    });
  });
});
