context('@andrew-codes/verdigris-wizard', () => {
  before(() => {
    cy.navigate('Navigation', 'Wizard');
  });
  it('documentation page contains API section for Analytics components', () => {
    cy.contains('h2', 'Component API').as('apiHeading');

    cy.get('@apiHeading')
      .next('h3')
      .should('have.text', 'Wizard')
      .next('[data-component="PropsTable"]')
      .should('exist');

    cy.get('@apiHeading')
      .next('h3')
      .should('have.text', 'WizardStep')
      .next('[data-component="PropsTable"]')
      .should('exist');
  });

  context('basic wizard features', () => {
    beforeEach(() => {
      cy.get('[data-test="linear-wizard"]').as('playground');
      cy.get('@playground')
        .contains('button', 'Next')
        .as('nextButton');
      cy.get('@playground')
        .contains('button', 'Previous')
        .as('previousButton');
    });

    it('wizards specify the starting step', () => {
      assertOnStep(1);
    });

    it('information on the current step index and total number of steps is provided to the consumer', () => {
      cy.get('@playground')
        .contains('Step 1 of 3')
        .should('exist');
    });
  });

  context('wizard navigation', () => {
    beforeEach(() => {
      cy.get('[data-test="validation"]').as('playground');
      cy.get('@playground')
        .contains('button', 'Next')
        .as('nextButton');
      cy.get('@playground')
        .contains('button', 'Previous')
        .as('previousButton');
    });

    it('wizard can be only be navigated forward if step is in a valid state', () => {
      assertOnStep(1);
      cy.get('@nextButton').click();
      assertOnStep(1);

      cy.get('@playground')
        .find('input')
        .type('firstName');
      cy.get('@nextButton').click();
      assertOnStep(2);

      cy.get('@playground')
        .find('input')
        .type('lastName');
      cy.get('@nextButton').click();
      assertOnStep(3);
    });

    it('wizard can unconditionally navigate to a previous step', () => {
      assertOnStep(1);
      cy.get('@playground')
        .find('input')
        .type('firstName');
      cy.get('@nextButton').click();
      assertOnStep(2);
      cy.get('@previousButton').click();
      assertOnStep(1);
    });
  });

  context('non-linear wizard navigation', () => {
    beforeEach(() => {
      cy.get('[data-test="non-linear"]').as('playground');
      cy.get('@playground')
        .contains('button', 'Next')
        .as('nextButton');
      cy.get('@playground')
        .contains('button', 'Previous')
        .as('previousButton');
    });
    it.only('steps can dynamically indicate the next step', () => {
      assertOnStep(1);
      cy.get('@nextButton').click();
      assertOnStep(2);
      cy.get('@previousButton').click();
      cy.get('@playground')
        .find('input')
        .click();
      cy.get('@nextButton').click();
      assertOnStep(3);
    });
  });
});

function assertOnStep(stepNumber) {
  cy.get('@playground')
    .contains('h2', `Step ${stepNumber}`)
    .should('exist');
}
