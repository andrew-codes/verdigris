/// <reference types="Cypress" />

let log;
Cypress.on('window:before:load', (win) => {
  log = cy.spy(win.console, "log")
});

context('analytics', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/packages/analytics/examples/create-and-fire-analytics-events/component');
  });
  it('analytics events can be triggered', () => {
    cy.get('#test-bed button')
      .click()
      .then(() => expect(log).to.be.calledWith([], { action: 'Save' }));
  });
});
