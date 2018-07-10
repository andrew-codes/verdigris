context('switch', () => {
  it('can render a switch that is off', () => {
    cy.visit('http://localhost:9000/packages/selection/examples/switch/component');

    cy.get('#basic-switch input[type="checkbox"]')
      .then(el => expect(el.is(':checked')).to.eql(false));
  });
  it('does not visibly show the checkbox input control', () => {
    cy.visit('http://localhost:9000/packages/selection/examples/switch/component');

    cy.get('#basic-switch input[type="checkbox"]').should('have.css', 'display', 'none');
  });
  it('can render a label for the switch', () => {
    cy.visit('http://localhost:9000/packages/selection/examples/switch/component');
    cy.get('#with-label')
      .then(el => expect(el.text()).to.eql('a label'));
  });
});
