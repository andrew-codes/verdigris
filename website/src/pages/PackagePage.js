import Loadable from 'react-loadable';
import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Page from '../components/Page';
import { getExamples, getPackage } from '../siteData';

const Title = styled('h1') ``;
const Summary = styled('p') ``;
const Spacer = styled('div') `
  height: 1.125rem;
`
const getPackageLandingDoc = (packageName) => Loadable({
  loader: () => import(`../../../packages/${packageName}/docs/00-intro`),
  loading: Loading,
  timeout: 3000,
});

export default ({ match }) => {
  const pkgId = match.params.packageName;
  const pkg = getPackage(pkgId);
  const { examples } = getExamples(pkgId);
  const PackageLandingDoc = getPackageLandingDoc(pkgId);

  return (
    <Page>
      {examples.length > 0 && <Link to={`/packages/${match.params.packageName}/examples/1/component`}>examples</Link>}
      {examples.length === 0 && <Spacer />}
      <Title>{pkg.title}</Title>
      <Summary>{pkg.description}</Summary>
      <PackageLandingDoc />
    </Page>
  );
};
