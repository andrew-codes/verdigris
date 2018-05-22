import Loadable from 'react-loadable';
import React from 'react';
import styled from 'react-emotion';
import EditInGitHubLink from '../components/EditInGitHubLink';
import Loading from '../components/Loading';
import { getPackage } from '../siteData';

const FloatingButton = styled('div') `
  position: fixed;
  right: 24px;
  top: 24px;
`
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
    <React.Fragment>
      <FloatingButton>
        <EditInGitHubLink />
      </FloatingButton>
      <PackageDoc />
    </React.Fragment >
  );
};
