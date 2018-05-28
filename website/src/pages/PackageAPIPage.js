import Loadable from 'react-loadable';
import React from 'react';
import styled from 'react-emotion';
import Loading from '../components/Loading';
import ComponentDoc from '../components/ComponentDoc';
import { getPackage } from '../siteData';

const Components = styled('div') ``;

export default ({ match: { params: { packageName } } }) => {
  const pkg = getPackage(packageName);
  const ComponentsDocs = Loadable({
    loader: () => Promise.all(pkg.componentsMetadata.map(c => c.componentMetadata())),
    loading: Loading,
    render(componentsMetadata) {
      console.log(componentsMetadata);

      return (
        <Components>
          {componentsMetadata
            .filter(metadata => Object.keys(metadata).filter(key => key !== 'default').length > 0)
            .map(metadata => {
              const exportedKey = Object.keys(metadata).filter(key => key !== 'default')[0];
              return metadata[exportedKey];
            })
            .map(metadata => (
              <ComponentDoc {...metadata} key={metadata.displayName} />
            ))}
        </Components>
      );
    }
  });

  return (
    <ComponentsDocs />
  );
};
