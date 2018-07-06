import React, { Component } from 'react';
import styled from 'react-emotion';
import { InlineCode } from '@verdigris/code';

const ComponentWrapper = styled('div')``;
const ComponentHeading = styled('h2')``;
const Summary = styled('p')``;
const PropsTable = styled('table')`
border-collapse: collapse;
border-spacing: 0;
width: 100%;
`;
const TableHeading = styled('th')`
border-bottom: 1px solid darkgray;
flex: ${p => p.flex ? p.flex : 'none'};
padding: 0.5rem;
text-align: left;
width: ${p => p.width ? p.width : 'auto'};
`;
const TableRow = styled('tr')`
background: ${p => isEven(p.rowNumber) ? 'lightgray' : 'none'};
display: flex;
`;
const TableCell = styled('td')`
border-bottom: 1px solid darkgray;
border-right: 1px solid darkgray;
flex: ${p => p.flex ? p.flex : 'none'};
padding: 0.5rem;
text-align: left;
word-wrap: break-word;

&:first-of-type {
  border-left: 1px solid darkgray;
}
`;
const PropNameText = styled('span')`
color: ${p => p.isRequired ? 'darkred' : 'black'};
font-weight: ${p => p.isRequired ? '600' : 'normal'};
`;

const PropName = ({ children, isRequired }) => (
  <PropNameText isRequired={isRequired}>{children}{isRequired && '*'}</PropNameText>
);

const PropTypeDefinition = ({ name, value }) => {
  if (name === 'union') return <span>{value.map(v => <React.Fragment key={v.name}><InlineCode>{v.name}</InlineCode>, </React.Fragment>)}</ span>;
  if (name === 'enum') return <InlineCode>{value}</InlineCode>;
  return <InlineCode>{name}</InlineCode>;
}

class ComponentDoc extends Component {
  render() {
    const {
      displayName,
      props,
      summary,
    } = this.props;

    return (
      <ComponentWrapper>
        <ComponentHeading>{`<${displayName} />`}</ComponentHeading>
        {summary && <Summary>{summary}</Summary>}
        <PropsTable>
          <thead>
            <TableRow>
              <TableHeading flex={1}>Name</TableHeading>
              <TableHeading width="100px">Type</TableHeading>
              <TableHeading width="110px">Default Value</TableHeading>
              <TableHeading flex={1.5}>Description</TableHeading>
            </TableRow>
          </thead>
          <tbody>
            {Object.values(props || {})
              .map((prop, index) => (
                <TableRow rowNumber={index + 1} key={prop.name}>
                  <TableCell flex={1}><PropName isRequired={prop.required}>{prop.name}</PropName></TableCell>
                  <TableCell width="100px"><PropTypeDefinition {...prop.type} /></TableCell>
                  <TableCell width="110px">{prop.defaultValue && <InlineCode language="javascript">{prop.defaultValue.value}</InlineCode>}</TableCell>
                  <TableCell flex={1.5}>{prop.description}</TableCell>
                </TableRow>
              ))}
          </tbody>
        </PropsTable>
      </ComponentWrapper>
    );
  }
}

export default ComponentDoc;

function isEven(number) {
  return number % 2 === 0;
}
