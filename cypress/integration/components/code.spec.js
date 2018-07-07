/// <reference types="Cypress" />

context('code block', () => {
  it('defaults to rendering without line numbers', () => {
    cy.visit('http://localhost:9000/packages/code/examples/code-block/component');
    cy.get('#with-language pre')
      .find('code')
      .then(codeBlocks => {
        expect(codeBlocks.length).to.eql(1);
        expect(codeBlocks.text()).to.equal('ls -a');
      });
  });
  it('can render with line numbers', () => {
    cy.visit('http://localhost:9000/packages/code/examples/code-block/component');
    cy.get('#with-line-numbers pre code:first-of-type')
      .find('span')
      .then(lineNumbers => {
        expect(lineNumbers.length).to.eql(2);
        expect(lineNumbers[0].textContent.trim()).to.eql('1');
        expect(lineNumbers[1].textContent.trim()).to.eql('2');
      });
  });
  it('can render with line numbers starting at a specific number', () => {
    cy.visit('http://localhost:9000/packages/code/examples/code-block/component');
    cy.get('#with-starting-line-number pre code:first-of-type')
      .find('span')
      .then(lineNumbers => {
        expect(lineNumbers.length).to.eql(2);
        expect(lineNumbers[0].textContent.trim()).to.eql('10');
        expect(lineNumbers[1].textContent.trim()).to.eql('11');
      });
  });
  it('can apply styles to line numbers', () => {
    cy.visit('http://localhost:9000/packages/code/examples/code-block/component');
    cy.get('#line-style-object pre code:first-of-type')
      .find('span')
      .then(lineNumbers => {
        expect(lineNumbers.length).to.eql(2);
        expect(lineNumbers[0].style.color).to.eql('blue');
        expect(lineNumbers[1].style.color).to.eql('blue');
      });
  });
  it('can apply styles based on the line number via a function', () => {
    cy.visit('http://localhost:9000/packages/code/examples/code-block/component');
    cy.get('#line-style-function pre code:first-of-type')
      .find('span')
      .then(lineNumbers => {
        expect(lineNumbers.length).to.eql(2);
        expect(lineNumbers[0].style.color).to.eql('blue');
        expect(lineNumbers[1].style.color).to.eql('green');
      });
  });
});

context('inline code', () => {
  it('can render inline code snippets', () => {
    cy.visit('http://localhost:9000/packages/code/examples/inline-code/component');
    cy.get('#inline-code').then(code => expect(code.text()).to.eql('ls -a'));
  })
});
