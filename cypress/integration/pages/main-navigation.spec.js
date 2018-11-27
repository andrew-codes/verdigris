context('main navigation', () => {
  const mainNav = [
    ['Getting Started', '/'],
    ['Customization', '/getting-started/customization'],
    ['Contributing', '/guides/contributing', 'Guides'],
    ['Tour of Code Base', '/guides/tour-of-code-base', 'Guides'],
    ['Analytics', '/packages/analytics', 'Components'],
    ['Chip', '/packages/chip/components/chip', 'Components'],
    ['Switch', '/packages/selection/components/switch', 'Components'],
    ['StyleProvider', '/packages/styleprovider', 'Other Packages'],
    ['StyleContainer', '/packages/stylecontainer', 'Other Packages'],
  ];

  mainNav.forEach(navParts => testPageInMainNavigation(...navParts));
});

function testPageInMainNavigation(pageName, pageUrlHref, subMenuName) {
  it(`"${pageName}" link exists and navigates user to proper URL (ending in ${pageUrlHref})`, () => {
    cy.visit('/')
      .get('nav')
      .as('nav');
    if (subMenuName) {
      cy.get('@nav')
        .contains('a', subMenuName)
        .click();
    }
    cy.get('nav')
      .contains('a', pageName)
      .click()
      .window(win =>
        expect(win.location.match(new RegExp(`${pageUrlHref}$`)).to.be.true),
      );
  });
}
