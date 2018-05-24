import React from 'react';
import styled from 'react-emotion';
import * as PropTypes from 'prop-types';
import { CodeBlock } from '@verdigris/code';

const PackageSummaryBlock = styled('aside') `
background: lightblue;
border: 1px solid darkblue;
box-sizing: border-box;
display: flex;
flex-direction: row;
padding: 1rem;
`;
const PackageProperties = styled('div') `
flex: 1;
`;
const PropertyContainer = styled('div') ``;
const PropertyLabel = styled('span') `
font-weight: 600;
`;
const PropertyValue = styled('span') ``;
const InstallCmdContainer = styled('div') `
width: 400px;
`

export default function PackageSummary({ name, shortName, version }) {
  return (
    <PackageSummaryBlock>
      <PackageProperties>
        <PropertyContainer>
          <PropertyLabel>Name: </PropertyLabel>
          <PropertyValue>{name}</PropertyValue>
        </PropertyContainer>
        <PropertyContainer>
          <PropertyLabel>Version: </PropertyLabel>
          <PropertyValue>{version}</PropertyValue>
        </PropertyContainer>
        <PropertyContainer>
          <PropertyLabel>Source: </PropertyLabel>
          <PropertyValue><a href={`https://github.com/andrew-codes/verdigris/tree/master/packages/${shortName}`} title="Source code">GitHub</a></PropertyValue>
        </PropertyContainer>
      </PackageProperties>
      <InstallCmdContainer>
        <CodeBlock style={{ backgroundColor: '#fff', }} language="bash">npm install @verdigris/analytics</CodeBlock>
      </InstallCmdContainer>
    </PackageSummaryBlock>
  )
}
PackageSummary.propTypes = {
  name: PropTypes.string,
  shortName: PropTypes.string,
  version: PropTypes.string,
};
PackageSummary.defaultProps = {
  name: '@verdigris/analytics',
  shortName: 'analytics',
  version: '0.0.0',
};
