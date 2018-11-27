context('main navigation', () => {
  const mainNav = [
    ['Getting Started', '/'],
    ['Customization', '/getting-started/customization'],
    ['Contributing', '/guides/contributing', 'Guides'],
    ['Tour of Code Base', '/guides/tour-of-code-base', 'Guides'],
    ['StyleProvider', '/packages/styleprovider', 'Other Packages'],
    ['StyleContainer', '/packages/stylecontainer', 'Other Packages'],
  ];

  mainNav.forEach(navParts => testPageInMainNavigation(...navParts));
});

function testPageInMainNavigation(pageName, pageUrlHref, subMenuName) {
  it(`"${pageName}" link exists and navigates user to proper URL (ending in ${pageUrlHref})`, () => {
    cy.navigate(subMenuName, pageName).window(win =>
      expect(win.location.match(new RegExp(`${pageUrlHref}$`)).to.be.true),
    );
  });
}
