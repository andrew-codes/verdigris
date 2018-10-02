import $ from 'jquery';

context('@andrew-codes/verdigris-docz', () => {
  context('ThemeDefinitionTable', () => {
    it('lists the theme definition in a tabular format', () => {
      cy.visit('/packages/chip/components/chip')
        .contains('h2', 'Theme API')
        .next()
        .find('.PropsTable')
        .as('table');

      cy.get('@table')
        .find('thead th')
        .should('have.length', 4)
        .then(els => {
          const textValues = els.map(el => el.text());
          expect(textValues).to.eql([
            'Property',
            'Type',
            'Default',
            'Description',
          ]);
        });
    });
  });
});
