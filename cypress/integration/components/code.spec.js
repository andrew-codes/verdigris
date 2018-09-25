/// <reference types="Cypress" />
import $ from 'jquery';

context('@verdigris/code', () => {
  before(() => {
    cy.visit('/packages/code/components/codeblock');
  });
  context('<CodeBlock />', () => {
    it('documentation page contains API section for Analytics components', () => {
      cy.contains('h2', 'API')
        .next()
        .find('.PropsTable')
        .should('exist');
    });
    it('defaults to rendering without line numbers', () => {
      cy.contains('h2', 'Examples')
        .nextUntil('[data-testid="examples"]')
        .find('[data-component="CodeBlock"]')
        .first()
        .find('.react-syntax-highlighter-line-number')
        .should('not.exist');
    });
    it('can render with line numbers', () => {
      cy.contains('h2', 'Examples')
        .nextUntil('[data-testid="examples"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[1])
        .find('.react-syntax-highlighter-line-number')
        .then(els => {
          expect($(els[0]).text()).to.equal('1\n');
          expect($(els[1]).text()).to.equal('2\n');
        });
    });
    it('can render with line numbers starting at a specific number', () => {
      cy.contains('h2', 'Examples')
        .nextUntil('[data-testid="examples"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[2])
        .find('.react-syntax-highlighter-line-number')
        .then(els => {
          expect($(els[0]).text()).to.equal('10\n');
          expect($(els[1]).text()).to.equal('11\n');
        });
    });
    it('can apply styles to line numbers', () => {
      cy.contains('h2', 'Examples')
        .nextUntil('[data-testid="examples"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[3])
        .find('.react-syntax-highlighter-line-number')
        .then(lineNumbers => {
          expect(lineNumbers[0].style.color).to.eql('blue');
          expect(lineNumbers[1].style.color).to.eql('blue');
        });
      cy.contains('h2', 'Examples')
        .nextUntil('[data-testid="examples"]')
        .find('[data-component="CodeBlock"]')
        .then(els => els[4])
        .find('.react-syntax-highlighter-line-number')
        .then(lineNumbers => {
          expect(lineNumbers[0].style.color).to.eql('blue');
          expect(lineNumbers[1].style.color).to.eql('green');
        });
    });
  });
});
