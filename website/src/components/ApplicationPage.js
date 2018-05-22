import React from 'react';
import styled from 'react-emotion';
import { noop } from 'lodash';
import * as PropTypes from 'prop-types';

export default Page;

const Wrapper = styled('div') `
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;
const NavAndPageContent = styled('div') `
  display: flex;
  flex: 1 1 auto;
`;
const Navigation = styled('div') `
  position: fixed;
  width: 300px;
  z-index: 2;
`;
const Content = styled('div') `
  flex: 1 1 auto;
  margin-left: 300px;
  min-width: 0;
  position: relative;
  z-index: 1;
`;
function Page(props) {
  const { children, nav } = props;

  return (
    <Wrapper>
      <NavAndPageContent>
        <Navigation>{nav()}</Navigation>
        <Content>{children}</Content>
      </NavAndPageContent>
    </Wrapper>
  );
}
Page.propTypes = {
  children: PropTypes.node,
  nav: PropTypes.func,
};
Page.defaultProps = {
  nav: noop,
};
