context('@andrew-codes/verdigris-docz', () => {
  it('PropsTable filters out createAnalyticsEvent prop type from component documentation', () => {
    cy.visit('/packages/chip/components/chip')
      .contains('h2', 'API')
      .next()
      .find('.PropsTable')
      .should('exist')
      .find('createAnalyticsEvent')
      .should('not.exist');
  });
});
