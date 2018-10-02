import $ from 'jquery';

context('@andrew-codes/verdigris-docz', () => {
  context('ThemeDefinitionTable', () => {
    it('lists the theme definition in a tabular format and hides the Required column', () => {
      cy.visit('/packages/chip/components/chip')
        .contains('h2', 'Theme API')
        .next()
        .find('.PropsTable')
        .as('table');

      cy.get('@table')
        .find('thead th')
        .then(els => {
          const textValues = els.toArray().map(el => $(el).text());
          expect(textValues).to.eql([
            'Property',
            'Type',
            'Required',
            'Default',
            'Description',
          ]);
        });

      cy.get('@table')
        .find('thead')
        .contains('Required')
        .should('have.css', 'display', 'none');
      cy.get('@table')
        .find('tbody td:nth-of-type(3)')
        .should('have.css', 'display', 'none');
    });
  });
});
