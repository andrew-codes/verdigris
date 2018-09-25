/// <reference types="Cypress" />

context('@andrew-codes/verdigris-chip', () => {
  before(() => {
    cy.visit('/packages/chip/components/chip');
  });
  it('documentation page contains API section for Analytics components', () => {
    cy.contains('h2', 'API')
      .next()
      .find('.PropsTable')
      .should('exist');
  });
  it('can render basic textual chips', () => {
    cy.contains('h2', 'Rendering Basic Chips')
      .siblings('[data-testid="basic-chips"]')
      .find('[data-component="Chip"]')
      .first()
      .should('have.text', 'basic text chip')
      .should('have.css', 'display', 'inline-flex')

      .next()
      .should('have.text', 'ichip with avatar')
      .next()
      .should('have.css', 'display', 'flex');
  });
  it('the root component can be configured to a different component', () => {
    cy.contains('h2', 'Using Custom Component')
      .siblings('[data-testid="custom-component"]')
      .find('[data-component="Chip"]')
      .find('a')
      .should('exist')
      .should('have.attr', 'href', 'https://verdigris.andrew.codes');
  });
  it('chips can be marked as clickable and therefore respond to onClick handler', () => {
    cy.contains('h2', 'Clickable Chips')
      .siblings('[data-testid="clickable-chips"]')
      .find('[data-component="Chip"]')
      .first()
      .should('have.css', 'cursor', 'pointer')
      .click()
      .window(win =>
        expect(win.log).to.be.calledWith('clickable chip clicked'),
      );
  });
  it('chips not marked as clickable do not respond to onClick handler', () => {
    cy.contains('h2', 'Rendering Basic Chips')
      .siblings('[data-testid="basic-chips"]')
      .find('[data-component="Chip"]')
      .first()
      .should('have.text', 'basic text chip')
      .click()
      .window(win => expect(win.log).to.not.be.called);
  });
  it('chips can be marked as deletable and respond to onDelete click handler', () => {
    cy.contains('h2', 'Deletable Chips')
      .siblings('[data-testid="deletable-chips"]')
      .find('[data-component="Chip"]')
      .first()
      .contains('deletable chip')
      .siblings('span')
      .first()
      .click()
      .window(win =>
        expect(win.log).to.be.calledWith('deletable chip deleted'),
      );
  });
  it('chips do not fire onClick handler when deleting a chip', () => {
    cy.contains('h2', 'Deletable Chips')
      .siblings('[data-testid="deletable-chips"]')
      .find('[data-component="Chip"]')
      .first()
      .next()
      .next()
      .contains('a clickable, deletable chip')
      .siblings('span')
      .first()
      .click()
      .window(win =>
        expect(win.log).to.not.be.calledWith(
          'clickable deletable chip clicked',
        ),
      );
  });
  it.skip('can change colors via a theme', () => {
    cy.get('#basic-chip-pink').should(
      'have.css',
      'background-color',
      'rgb(255, 192, 203)',
    );
    cy.get('#basic-chip-pink > div > span').should(
      'have.css',
      'color',
      'rgb(255, 0, 0)',
    );
    cy.get('#deletable-chip-pink > div > span:nth-of-type(3)').should(
      'have.css',
      'background-color',
      'rgb(255, 0, 0)',
    );
  });
  it.skip('changing sizing via a theme scales the chip appropriately', () => {
    // baseSize: 24, lineHeight: 1.25
    cy.get('#deletable-chip-bigger').should('have.css', 'min-height', '38px');
    cy.get('#deletable-chip-bigger > div > span:nth-of-type(2)')
      .should('have.css', 'font-size', '24px')
      .should('have.css', 'line-height', '30px');
    cy.get('#deletable-chip-bigger > div > span:nth-of-type(3)').then(
      deleteButton => {
        expect(deleteButton.outerHeight()).to.eql(30);
        expect(deleteButton.outerWidth()).to.eql(30);
      },
    );
  });
});
