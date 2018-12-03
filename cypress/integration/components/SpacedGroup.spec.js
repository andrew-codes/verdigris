context('@andrew-codes/verdigris-spaced-group', () => {
  beforeEach(() => {
    cy.navigate('Layout', 'SpacedGroup');
  });

  it('documentation page contains API section for components', () => {
    cy.contains('h2', 'Component API')
      .next('[data-component="PropsTable"]')
      .should('exist');
  });
  it('it can space children equally horizontally', () => {
    cy.get('[data-test="direction"]')
      .find('[data-component="SpacedGroup"]')
      .find('[data-component="SpacedGroup"]')
      .first()
      .should('have.css', 'flex-direction', 'row')
      .should('have.css', 'flex-wrap', 'wrap')
      .children()
      .should('have.css', 'margin-top', '8px')
      .should('have.css', 'margin-right', '8px')
      .should('have.css', 'margin-bottom', '8px')
      .should('have.css', 'margin-left', '8px');
  });
  it('it can space children equally vertically', () => {
    cy.get('[data-test="direction"]')
      .find('[data-component="SpacedGroup"]')
      .find('[data-component="SpacedGroup"]')
      .next()
      .should('have.css', 'flex-direction', 'column')
      .should('have.css', 'flex-wrap', 'wrap')
      .children()
      .should('have.css', 'margin-top', '8px')
      .should('have.css', 'margin-right', '8px')
      .should('have.css', 'margin-bottom', '8px')
      .should('have.css', 'margin-left', '8px');
  });
  it('spaced groups can be centered', () => {
    cy.get('[data-test="centered"]')
      .find('[data-component="SpacedGroup"]')
      .find('[data-component="SpacedGroup"]')
      .first()
      .should('have.css', 'align-items', 'center')
      .next()
      .should('have.css', 'align-items', 'center');
  });
  it.only('spaced groups respect breakpoints', () => {
    cy.get('[data-test="breakpoints"]')
      .find('[data-component="SpacedGroup"]')
      .as('parentSpacedGroup');

    cy.viewport(600, 1000);
    cy.get('@parentSpacedGroup')
      .find('[data-component="SpacedGroup"]')
      .first()
      .children()
      .should('have.css', 'margin-top', '8px')
      .should('have.css', 'margin-right', '8px')
      .should('have.css', 'margin-bottom', '8px')
      .should('have.css', 'margin-left', '8px');

    cy.viewport(1920, 1000);
    cy.get('@parentSpacedGroup')
      .find('[data-component="SpacedGroup"]')
      .first()
      .children()
      .should('have.css', 'margin-top', '40px')
      .should('have.css', 'margin-right', '40px')
      .should('have.css', 'margin-bottom', '40px')
      .should('have.css', 'margin-left', '40px');
  });
});
