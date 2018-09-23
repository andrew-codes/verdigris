/// <reference types="Cypress" />
import $ from 'jquery';

context('@verdigris/code', () => {
  before(() => {
    cy.visit('/packages/code');
  });
  context('code block', () => {
    it('defaults to rendering without line numbers', () => {
      cy.contains('h2', 'Inline Code')
        .siblings('[data-testid="code-block"]')
        .find('[data-component="CodeBlock"]')
        .first()
        .find('.react-syntax-highlighter-line-number')
        .should('not.exist');
    });
    it('can render with line numbers', () => {
      cy.contains('h2', 'Inline Code')
        .siblings('[data-testid="code-block"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[1])
        .find('.react-syntax-highlighter-line-number')
        .then(els => {
          expect($(els[0]).text()).to.equal('1\n');
          expect($(els[1]).text()).to.equal('2\n');
        });
    });
    it('can render with line numbers starting at a specific number', () => {
      cy.contains('h2', 'Inline Code')
        .siblings('[data-testid="code-block"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[2])
        .find('.react-syntax-highlighter-line-number')
        .then(els => {
          expect($(els[0]).text()).to.equal('10\n');
          expect($(els[1]).text()).to.equal('11\n');
        });
    });
    it('can apply styles to line numbers', () => {
      cy.contains('h2', 'Inline Code')
        .siblings('[data-testid="code-block"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[3])
        .find('.react-syntax-highlighter-line-number')
        .then(lineNumbers => {
          expect(lineNumbers[0].style.color).to.eql('blue');
          expect(lineNumbers[1].style.color).to.eql('blue');
        });
      cy.contains('h2', 'Inline Code')
        .siblings('[data-testid="code-block"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[4])
        .find('.react-syntax-highlighter-line-number')
        .then(lineNumbers => {
          expect(lineNumbers[0].style.color).to.eql('blue');
          expect(lineNumbers[1].style.color).to.eql('green');
        });
    });
  });

  context('inline code', () => {
    it('can render inline code snippets', () => {
      cy.contains('h2', 'Inline Code')
        .siblings('[data-testid="inline-code"]')
        .find('[data-component="InlineCode"]')
        .should('have.text', 'ls -a')
        .then(el => expect(el.prop('tagName').toLowerCase()).to.equal('code'));
    });
  });
});
