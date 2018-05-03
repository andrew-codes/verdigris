import Loadable from 'react-loadable';
import React from 'react';

import Loading from '../components/Loading';

const getReadMe = (packageName) => Loadable({
  loader: () => {
    return import(`../../../packages/${packageName}/README.md`)
  },
  loading: Loading,
  timeout: 3000,
});

export default ({ match }) => {
  const ReadMe = getReadMe(match.params.packageName);
  return <ReadMe />;
};
