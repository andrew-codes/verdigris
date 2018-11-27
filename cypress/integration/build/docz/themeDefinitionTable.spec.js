import $ from 'jquery';

context('@andrew-codes/verdigris-docz', () => {
  context('ThemeDefinitionTable', () => {
    it('lists the theme definition in a tabular format and hides the Required column', () => {
      cy.visit('/packages/chip/components/chip')
        .contains('h2', 'Theme API')
        .next('[data-component="PropsTable"]')
        .as('table');

      cy.get('@table')
        .find('thead th')
        .then(els => {
          const textValues = els.toArray().map(el => $(el).text());
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
