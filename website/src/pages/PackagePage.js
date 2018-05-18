import Loadable from 'react-loadable';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Page from '../components/Page';

const getReadMe = (packageName) => Loadable({
  loader: () => {
    return import(`../../../packages/${packageName}/README.md`)
  },
  loading: Loading,
  timeout: 3000,
});

export default ({ match }) => {
  const ReadMe = getReadMe(match.params.packageName);
  return (
    <Page>
      <Link to={`/packages/${match.params.packageName}/examples/1/component`}>examples</Link>
      <ReadMe />
    </Page>
  );
};
