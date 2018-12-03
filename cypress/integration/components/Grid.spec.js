context('@andrew-codes/grid', () => {
  before(() => {
    cy.navigate('Layout', 'Grid');
  });

  it('documentation page contains API section for components', () => {
    cy.contains('h2', 'Grid API')
      .next('[data-component="PropsTable"]')
      .should('exist');
    cy.contains('h2', 'GridItem API')
      .next('[data-component="PropsTable"]')
      .should('exist');
  });

  it('grids can be responsive', () => {
    cy.get('[data-test="responsive"]').as('grid');

    cy.viewport(1920, 1000);
    cy.get('@grid')
      .find('[data-test="x12"]')
      .should('have.css', 'flex-basis', '100%')
      .should('have.css', 'max-width', '100%');
    cy.get('@grid')
      .find('[data-test="x6"]')
      .should('have.css', 'flex-basis', '50%')
      .should('have.css', 'max-width', '50%');
    cy.get('@grid')
      .find('[data-test="x4"]')
      .should('have.css', 'flex-basis', '33.3333%')
      .should('have.css', 'max-width', '33.3333%');
    cy.get('@grid')
      .find('[data-test="x3"]')
      .should('have.css', 'flex-basis', '25%')
      .should('have.css', 'max-width', '25%');

    cy.viewport(400, 1000);
    cy.get('@grid')
      .find('[data-test]')
      .should('have.css', 'flex-basis', '100%')
      .should('have.css', 'max-width', '100%');
  });

  it('grid orientation can be row', () => {
    cy.get('[data-test="row"]').should('have.css', 'flex-direction', 'row');
  });

  it('grid row orientations can be reversed', () => {
    cy.get('[data-test="row-reverse"]').should(
      'have.css',
      'flex-direction',
      'row-reverse',
    );
  });

  it('grid orientation can be column', () => {
    cy.get('[data-test="column"]').should(
      'have.css',
      'flex-direction',
      'column',
    );
  });

  it('grid column orientations can be reversed', () => {
    cy.get('[data-test="column-reverse"]').should(
      'have.css',
      'flex-direction',
      'column-reverse',
    );
  });
});
