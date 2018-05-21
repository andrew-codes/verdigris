import Loadable from 'react-loadable';
import React from 'react';
import Loading from '../components/Loading';

const getPackageDoc = (packageName, docId) => Loadable({
  loader: () => import(`../../../packages/${packageName}/docs/docs/${docId}`),
  loading: Loading,
  timeout: 3000,
});

export default ({ match }) => {
  const {
    docId,
    packageName,
  } = match.params;
  const PackageDoc = getPackageDoc(packageName, docId);

  return (
    <PackageDoc />
  );
};
