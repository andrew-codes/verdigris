import React from 'react';
import styled from 'react-emotion';
import * as PropTypes from 'prop-types';
import { CodeBlock } from '@verdigris/code';

const Wrapper = styled('aside') `
background: lightblue;
border: 1px solid darkblue;
box-sizing: border-box;
display: flex;
flex-direction: column;
padding: 1rem;
`;
const QuickInfo = styled('div') `
display: flex;
flex-direction: row;
padding-bottom: 1rem;
`;
const Properties = styled('div') `
flex: 1;
`;
const PropertyWrapper = styled('div') ``;
const Label = styled('span') `
font-weight: 600;
`;
const Value = styled('span') ``;
const InstallCmdContainer = styled('div') `
width: 400px;
`;
const Description = styled('p') `
border-top: 1px solid darkblue;
margin: 0;
padding-top: 1rem;
`;

export default function PackageSummary({ description, name, sourceName, version }) {
  return (
    <Wrapper>
      <QuickInfo>
        <Properties>
          <PropertyWrapper>
            <Label>Name: </Label>
            <Value>{name}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Label>Version: </Label>
            <Value>{version}</Value>
          </PropertyWrapper>
          <PropertyWrapper>
            <Label>Source: </Label>
            <Value><a href={`https://github.com/andrew-codes/verdigris/tree/master/packages/${sourceName}`} title="Source code">GitHub</a></Value>
          </PropertyWrapper>
        </Properties>
        <InstallCmdContainer>
          <CodeBlock style={{ backgroundColor: '#fff', }} language="bash">{`npm install ${name}`}</CodeBlock>
        </InstallCmdContainer>
      </QuickInfo>
      <Description>{description}</Description>
    </Wrapper>
  )
}
PackageSummary.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  sourceName: PropTypes.string,
  version: PropTypes.string,
};
