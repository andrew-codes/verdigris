import React from 'react';
import styled from 'styled-components';
import { noop } from 'lodash';
import * as PropTypes from 'prop-types';

export default Page;

const Root = styled.div`
display: flex;
`
const Aside = styled.aside`
`;
const Main = styled.main`
flex: 1 1 auto;
padding: 1.5rem 3rem;
`;
function Page(props) {
  const {
    children,
    nav,
  } = props;

  return (
    <Root>
      <Aside>
        {nav()}
      </Aside>
      <Main>{children}</Main>
    </Root>
  );
}
Page.propTypes = {
  children: PropTypes.node,
  nav: PropTypes.func,
};
Page.defaultProps = {
  nav: noop,
}
