import isString from 'lodash.isstring';
import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const Grow = ({ children, ...rest }) => {
  const Growing = createComponent(
    () => ({
      flexBasis: 'auto',
      flexGrow: 1,
      maxWidth: 'none',
    }),
    'span',
  );
  const instance = isString(children) ? false : React.Children.only(children);

  return (
    <StyleProvider>
      <Growing {...rest} {...children.props} instance={instance}>
        {instance ? children.props.children : children}
      </Growing>
    </StyleProvider>
  );
};

Grow.propTypes = {
  /** Single render-able node that should grow. */
  children: PropTypes.node.isRequired,
};

export default Grow;
