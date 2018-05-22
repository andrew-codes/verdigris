import Loadable from 'react-loadable';
import React from 'react';
import styled from 'react-emotion';
import { Link, Route, Switch } from 'react-router-dom';
import Loading from '../components/Loading';
import PackageDocPage from './PackageDocPage';
import PackageExamples from './PackageExamples';
import Page from '../components/Page';
import { getPackage } from '../siteData';

const Title = styled('h1') ``;
const NavigationList = styled('ol') `
  list-style: none;
  padding: 0;
  li {
    display: ${p => p.horizontal ? 'inline-block' : 'block'};
    margin: 0.65rem;
  }
  li:first-of-type {
    margin-left: 0;
  }
`;
const NavigationListItem = styled('li') `
  border-bottom: 3px solid;
  border-bottom-color: ${p => p.isSelected ? 'blue' : 'transparent'};
  a:active,
  a:link,
  a:visited {
    color: #474c54;
    display: block;
    text-decoration: none;
  }
  a:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export default ({ match, location: { pathname } }) => {
  const pkgId = match.params.packageName;
  const pkg = getPackage(pkgId);
  const intro = Loadable({
    loader: () => pkg.intro.exports(),
    loading: Loading,
  });
  const usage = Loadable({
    loader: () => pkg.usage.exports(),
    loading: Loading,
  });
  const style = Loadable({
    loader: () => pkg.style.exports(),
    loading: Loading,
  });
  return (
    <Page width="large">
      <Title>{pkg.title}</Title>
      <NavigationList horizontal>
        <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}$`))}>
          <Link to={`/packages/${pkgId}`}>code</Link>
        </NavigationListItem>
        {pkg.usage && (
          <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}/usage$`))}>
            <Link to={`/packages/${pkgId}/usage`}>usage</Link>
          </NavigationListItem>
        )}
        {pkg.style && (
          <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}/style$`))}>
            <Link to={`/packages/${pkgId}/style`}>style</Link>
          </NavigationListItem>
        )}
        {pkg.examples.length > 0 && (
          <NavigationListItem isSelected={pathname.match(new RegExp(`/packages/${pkgId}/examples/.*`))}>
            <Link to={`/packages/${pkgId}/examples/${pkg.examples[0].id}/component`}>examples</Link>
          </NavigationListItem>
        )}
      </NavigationList>

      <Switch>
        <Route exact path={`/packages/${pkgId}`} component={intro} />
        <Route path="/packages/:packageName/docs/:docId" component={PackageDocPage} />
        {pkg.usage && <Route exact path="/packages/:packageName/usage" component={usage} />}
        {pkg.style && <Route exact path="/packages/:packageName/style" component={style} />}
        <Route path="/packages/:packageName/examples/:exampleId/:exampleType" component={PackageExamples} />
      </Switch>
    </Page >
  );
};
