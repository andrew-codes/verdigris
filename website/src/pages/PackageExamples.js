import Code from '@verdigris/code';
import React from 'react';
import styled from 'react-emotion';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import { getExamples, getPkgs } from '../siteData';

const Wrapper = styled('div') `
  box-sizing: border-box;
  display: flex;
  flex: 1;
`;
const BreadcrumbNavigation = styled('div') `
  display: block;
`;
const Title = styled('h1') `
  display: inline-block;
`;
const SubTitle = styled('h2') `
  color: #474c54;
  display: inline-block;
  margin: 0;
  padding: 0 1rem;
`
const ExamplesNavigation = styled('div') `
  margin: 0 1rem 0 0;
  width: 260px;
`;
const NavigationList = styled('ol') `
  list-style: none;
  padding: 0;
  li {
    display: ${p => p.horizontal ? 'inline-block' : 'block'}
  }
`;
const NavigationListItem = styled('li') `
  background: ${p => (p.isSelected ? 'rgba(0, 0, 0, 0.25)' : 'none')};
  border-radius: 3px;
  a:active,
  a:link,
  a:visited {
    color: #474c54;
    display: block;
    padding: 0.65rem;
    text-decoration: none;
  }
  a:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
const ExampleWrapper = styled('div') `
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const ExampleComponentWrapper = styled('div') `
  border: 1px solid gray;
  flex: 1;
  padding: 1rem;
`;
const ExampleCodeWrapper = styled('div') `
  flex: 1;
`;
const ExampleTabs = styled('div') `
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default ({ match }) => {
  const {
    exampleType,
    packageName,
  } = match.params;
  const packages = getPkgs();
  const { title } = packages.find(pkg => pkg.id === packageName);
  const currentExampleId = +match.params.exampleId;
  const { example, examples } = getExamples(packageName, currentExampleId);

  const ExampleComponent = example.Component;

  return (
    <Page width="xlarge">
      <BreadcrumbNavigation>
        <Link to={`/packages/${match.params.packageName}`}>back to docs</Link>
      </BreadcrumbNavigation>
      <Title>{title}</Title>
      <SubTitle>examples</SubTitle>
      <Wrapper>
        <ExamplesNavigation>
          <NavigationList>
            {examples.map(example => (
              <NavigationListItem isSelected={example.isSelected} key={example.id}>
                <Link to={`/packages/${packageName}/examples/${example.id}/${exampleType}`}>{example.title}</Link>
              </NavigationListItem>
            ))}
          </NavigationList>
        </ExamplesNavigation>
        <ExampleWrapper>
          <ExampleTabs>
            <NavigationList horizontal>
              <NavigationListItem isSelected={match.params.exampleType === 'component'}>
                <Link to={`/packages/${packageName}/examples/${example.id}/component`}>component</Link>
              </NavigationListItem>
              <NavigationListItem isSelected={match.params.exampleType === 'code'}>
                <Link to={`/packages/${packageName}/examples/${example.id}/code`}>code</Link>
              </NavigationListItem>
            </NavigationList>
            <Route path="/packages/:packageName/examples/:exampleId/component" component={() => (
              <ExampleComponentWrapper>
                <ExampleComponent />
              </ExampleComponentWrapper>
            )} />
            <Route path="/packages/:packageName/examples/:exampleId/code" component={() => (
              <Code height="500px" language="javascript" style={{ flex: 1 }}>{example.code}</Code>
            )} />
          </ExampleTabs>
        </ExampleWrapper>
      </Wrapper>
    </Page >
  );
};
