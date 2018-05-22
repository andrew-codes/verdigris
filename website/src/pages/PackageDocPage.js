import Loadable from 'react-loadable';
import React from 'react';
import Loading from '../components/Loading';
import { getPackage } from '../siteData';

export default ({ match }) => {
  const {
    docId,
    packageName,
  } = match.params;
  const pkg = getPackage(packageName);
  const PackageDoc = Loadable({
    loader: () => {
      const doc = pkg.docs.find(d => d.id === docId);
      return doc.exports();
    },
    loading: Loading,
  });

  return (
    <PackageDoc />
  );
};
