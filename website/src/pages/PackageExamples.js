import Loadable from 'react-loadable';
import CodeBlock from '@verdigris/code';
import Loading from '../components/Loading';
import React from 'react';
import styled from 'react-emotion';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { getPackage } from '../siteData';

const Wrapper = styled('div') `
  box-sizing: border-box;
  display: flex;
  flex: 1;
`;
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
const ExampleTabs = styled('div') `
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default ({ match, location: { pathname } }) => {
  const {
    exampleType,
    packageName,
  } = match.params;
  const currentExampleId = match.params.exampleId;
  const { examples } = getPackage(packageName);
  const currentExample = examples.find(ex => ex.id === currentExampleId);

  const ExampleComponent = Loadable({
    loader: () => currentExample.exports(),
    loading: Loading,
  });
  const ExampleCode = Loadable({
    loader: () => currentExample.contents(),
    loading: Loading,
    render(contents) {
      return <CodeBlock language="javascript" style={{ flex: 1 }}>{contents.default.replace(/'\.\.\/src\/?(index)';/, `'@verdigris/${packageName}';`)}</CodeBlock>
    },
  });

  return (
    <Wrapper>
      <ExamplesNavigation>
        <NavigationList>
          {examples.map(example => (
            <NavigationListItem isSelected={pathname === `/packages/${packageName}/examples/${example.id}/${exampleType}`} key={example.id}>
              <Link to={`/packages/${packageName}/examples/${example.id}/${exampleType}`}>{example.title}</Link>
            </NavigationListItem>
          ))}
        </NavigationList>
      </ExamplesNavigation>
      <ExampleWrapper>
        <ExampleTabs>
          <NavigationList horizontal>
            <NavigationListItem isSelected={match.params.exampleType === 'component'}>
              <Link to={`/packages/${packageName}/examples/${currentExample.id}/component`}>component</Link>
            </NavigationListItem>
            <NavigationListItem isSelected={match.params.exampleType === 'code'}>
              <Link to={`/packages/${packageName}/examples/${currentExample.id}/code`}>code</Link>
            </NavigationListItem>
          </NavigationList>
          <Route path="/packages/:packageName/examples/:exampleId/component" component={() => (
            <ExampleComponentWrapper>
              <ExampleComponent />
            </ExampleComponentWrapper>
          )} />
          <Route path="/packages/:packageName/examples/:exampleId/code" component={() => (
            <ExampleCode />
          )} />
        </ExampleTabs>
      </ExampleWrapper>
    </Wrapper>
  );
};
