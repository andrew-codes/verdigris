import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { getDocs, getPkgs } from '../siteData';

export default Nav;

const Navigation = styled('aside') `
  background: #dde2e9;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
`;
const SiteNavigation = styled('div') `
  background: #dde2e9;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
`;
const NavigationSectionHeading = styled('div') `
  color: #474c54;
  font-weight: 600;
`;
const NavigationList = styled('ol') `
  list-style: none;
  padding: 0;
`;
const NavigationListItem = styled('li') `
  background: ${p => (p.isSelected ? 'rgba(255, 255, 255, 0.5)' : 'none')};
  border-radius: 3px;
  a:active,
  a:link,
  a:visited {
    color: #474c54;
    display: block;
    padding: 0.65rem;
    text-decoration: none;
  }
  a:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
const SubNavigationList = styled('ol') `
  list-style: none;
  padding: 0;
  margin-left: 1rem;
`;
function Nav({ location: { pathname } }) {
  return (
    <Navigation>
      <SiteNavigation>
        <div>
          {getDocs().map(({ id, title, pages }) => (
            <React.Fragment key={id}>
              <NavigationSectionHeading>{title}</NavigationSectionHeading>
              <nav>
                <NavigationList>
                  {pages.map(docPage => (
                    <NavigationListItem
                      isSelected={`/docs/${id}/${docPage.id}` === pathname}
                      key={`${id}-doc-${docPage.id}`}
                    >
                      <Link to={`/docs/${id}/${docPage.id}`}>{docPage.title}</Link>
                    </NavigationListItem>
                  ))}
                </NavigationList>
              </nav>
            </React.Fragment>
          ))}
        </div>
        <div>
          <NavigationSectionHeading>Components</NavigationSectionHeading>
          <nav>
            <NavigationList>
              {getPkgs().map(({ docs, id, title }) => (
                <div key={`package-${id}`}>
                  <NavigationListItem
                    isSelected={pathname.match(new RegExp(`/packages/${id}(/(usage|style|examples.*))?$`))}
                  >
                    <Link to={`/packages/${id}`}>{title}</Link>
                  </NavigationListItem>
                  {docs.length > 0 && pathname.match(new RegExp(`/packages/${id}`)) && (
                    <SubNavigationList>
                      {docs.map(doc => (
                        <NavigationListItem
                          isSelected={pathname.match(new RegExp(`/packages/${id}/docs/${doc.id}`))}
                          key={doc.id}
                        >
                          <Link to={`/packages/${id}/docs/${doc.id}`}>{doc.title}</Link>
                        </NavigationListItem>
                      ))}
                    </SubNavigationList>
                  )}
                </div>
              ))}
            </NavigationList>
          </nav>
        </div>
      </SiteNavigation>
    </Navigation>
  );
}
Nav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};
