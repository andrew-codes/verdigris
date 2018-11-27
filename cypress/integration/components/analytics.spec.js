/// <reference types="Cypress" />

context('@andrew-codes/verdigris-analytics', () => {
  before(() => {
    cy.visit('/packages/analytics');
  });
  it('documentation page contains API section for Analytics components', () => {
    cy.contains('h2', 'API')
      .siblings('#analyticscontext')
      .next('[data-component="PropsTable"]')
      .should('exist');
    cy.contains('h2', 'API')
      .siblings('#analyticslistener')
      .next('[data-component="PropsTable"]')
      .should('exist');
  });
  it('analytics events can be triggered and handled selectively for specific event channels', () => {
    cy.contains('h2', 'Handling Fired Events')
      .siblings('[data-test="handling-fired-events"]')
      .find('[data-component="Chip"]')
      .click()
      .window(win => {
        expect(win.log).to.be.calledWith({ action: 'Save' });
      });
  });
  it('analytics events can be augmented with contextual data', () => {
    cy.contains('h2', 'Providing Contextual Data')
      .siblings('[data-test="contextual-data"]')
      .find('[data-component="Chip"]')
      .click()
      .window(win => {
        expect(win.log).to.be.calledWith(
          [{ oidToken: 'User:1' }, { friend: 'User:2' }],
          { action: 'Save' },
        );
      });
  });
  it('analytics events can be used via `withAnalytics` HoC', () => {
    cy.contains('h2', 'Custom Components')
      .siblings('[data-test="custom-components"]')
      .contains('button', 'Save')
      .click()
      .window(win => {
        expect(win.log).to.be.calledWith([], { action: 'Save' });
      });
  });
  it('analytics events can be updated, but only before being fired', () => {
    cy.visit('/packages/analytics');
    cy.contains('h2', 'Updating Events')
      .siblings('[data-test="updating-event"]')
      .find('[data-component="Chip"]')
      .click()
      .click()
      .click()
      .window(win => {
        expect(win.log).to.be.calledWith([], { action: 'Save' });
        expect(win.log).to.be.calledExactly(1);
      });
  });
  it('analytics events can be fired asynchronously even after a component unmounts', () => {
    cy.contains('h2', 'Async Events')
      .siblings('[data-test="async-events"]')
      .contains('button', 'Save')
      .click()
      .window(win => {
        expect(win.log).to.be.calledWith(
          [
            {
              form: 'MyForm',
              formAction: 'new',
            },
          ],
          {
            action: 'Save',
            oidToken: 'User:1234',
          },
        );
        expect(win.log).to.be.calledExactly(1);
      })
      .contains('span', 'Saved!')
      .should('exist');
  });
});
