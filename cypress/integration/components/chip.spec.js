/// <reference types="Cypress" />

let log;
Cypress.on('window:before:load', (win) => {
  log = cy.spy(win.console, "log");
});
context('chip', () => {
  it('can render text within a chip', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/chip-examples/component');
    cy.get('#basic-chip')
      .should('have.text', 'basic chip');
    cy.get('#basic-chip span')
      .should('have.length', 1);
  });
  it('can render an avatar with the chip', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/chip-examples/component');
    cy.get('#with-avatar > div > span')
      .should('have.length', 2);
    cy.get('#with-avatar > div > span:nth-of-type(1)')
      .should('have.text', 'i');
    cy.get('#with-avatar > div > span:nth-of-type(2)')
      .should('have.text', 'avatar chip');
  });
  it('can render using a custom component', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/chip-examples/component');
    cy.get('#asset-link > a')
      .should('have.length', 1);
    cy.get('#asset-link > a')
      .should('have.attr', 'href', 'https://google.com');
  });
  it('can render chips as clickable', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/chip-examples/component');
    cy.get('#clickable-chip')
      .should('have.css', 'cursor', 'pointer')
      .click()
      .then(() => expect(log).to.be.calledWith('clickable chip clicked'));

  });
  it('can render chips as deletable', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/chip-examples/component');
    cy.get('#deletable-chip > div > span:nth-of-type(3)')
      .click()
      .then(() => expect(log).to.be.calledWith('deletable chip deleted'));
  });
  it('does not fire click event when deleting a chip', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/chip-examples/component');
    cy.get('#clickable-deletable-chip > div > span:nth-of-type(3)')
      .click()
      .then(() => {
        expect(log).to.not.be.calledWith('clickable deletable chip clicked');
        expect(log).to.be.calledWith('clickable deletable chip deleted');
      });
    cy.get('#clickable-deletable-chip')
      .click()
      .then(() => expect(log).to.be.calledWith('clickable deletable chip clicked'));
  });
  it('chips can be full width', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/chip-examples/component');
    cy.get('#test-bed > div')
      .then(container => container.width())
      .then((parentWidth) => cy.get('#full-width')
        .then(el => ({
          parentWidth,
          elWidth: el.outerWidth(true)
        })))
      .then(({ parentWidth, elWidth }) => expect(parentWidth).to.eql(elWidth));
  });
  it('can change colors via a theme', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/theming-chips/component');
    cy.get('#basic-chip-pink')
      .should('have.css', 'background-color', 'rgb(255, 192, 203)');
    cy.get('#basic-chip-pink > div > span')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('#deletable-chip-pink > div > span:nth-of-type(3)')
      .should('have.css', 'background-color', 'rgb(255, 0, 0)');
  });
  it('changing sizing via a theme scales the chip appropriately', () => {
    cy.visit('http://localhost:9000/packages/chip/examples/theming-chips/component');
    // baseSize: 24, lineHeight: 1.25
    cy.get('#deletable-chip-bigger')
      .should('have.css', 'min-height', '38px');
    cy.get('#deletable-chip-bigger > div > span:nth-of-type(2)')
      .should('have.css', 'font-size', '24px')
      .should('have.css', 'line-height', '30px');
    cy.get('#deletable-chip-bigger > div > span:nth-of-type(3)')
      .then(deleteButton => {
        expect(deleteButton.outerHeight()).to.eql(30);
        expect(deleteButton.outerWidth()).to.eql(30);
      });
  });
});
