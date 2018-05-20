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
  width: 300px;
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
function Nav({ location: { pathname } }) {
  return (
    <Navigation>
      <SiteNavigation>
        <div>
          <NavigationSectionHeading>Documentation</NavigationSectionHeading>
          <nav>
            <NavigationList>
              {getDocs().map(({ id, title }) => (
                <NavigationListItem
                  isSelected={`/docs/${id}` === pathname}
                  key={id}
                >
                  <Link to={`/docs/${id}`}>{title}</Link>
                </NavigationListItem>
              ))}
            </NavigationList>
          </nav>
        </div>
        <div>
          <NavigationSectionHeading>Components</NavigationSectionHeading>
          <nav>
            <NavigationList>
              {getPkgs().map(({ id, title }) => (
                <NavigationListItem
                  isSelected={`/packages/${id}` === pathname}
                  key={id}
                >
                  <Link to={`/packages/${id}`}>{title}</Link>
                </NavigationListItem>
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
