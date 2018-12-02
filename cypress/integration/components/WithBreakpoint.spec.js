context('@andrew-codes/verdigris-with-breakpoint', () => {
  beforeEach(() => {
    cy.navigate('Layout', 'WithBreakpoint');
  });
  it('documentation page contains API section for components', () => {
    cy.contains('h2', 'Component API')
      .next('[data-component="PropsTable"]')
      .should('exist');
    cy.contains('h2', 'Theme API')
      .next('[data-component="PropsTable"]')
      .should('exist');
  });
  it('can calculate the current breakpoint', () => {
    cy.get('[data-test="withbreakpoint"]').as('playground');
    cy.viewport(600, 1000);
    cy.get('@playground')
      .contains('md')
      .should('exist');
    cy.viewport(650, 1000);
    cy.get('@playground')
      .contains('md')
      .should('exist');
    cy.viewport(1280, 1000);
    cy.get('@playground')
      .contains('lg')
      .should('exist');
    cy.viewport(400, 1000);
    cy.get('@playground')
      .contains('xs')
      .should('exist');
  });
});
