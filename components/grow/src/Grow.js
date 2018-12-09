import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import ApplyStyleRule from '@andrew-codes/verdigris-apply-style-rule';

const growRule = () => ({
  flexBasis: 'auto',
  flexGrow: 1,
  maxWidth: 'none',
});

const Grow = ({ children, ...rest }) => (
  <StyleProvider>
    <ApplyStyleRule {...rest} {...children.props} styleRule={growRule}>
      {children}
    </ApplyStyleRule>
  </StyleProvider>
);

Grow.propTypes = {
  /** Single render-able node that should grow. */
  children: PropTypes.node.isRequired,
};

export default Grow;
