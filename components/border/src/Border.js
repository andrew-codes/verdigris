import isString from 'lodash.isstring';
import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const Border = ({ children, ...rest }) => {
  const WithBorder = createComponent(
    ({ color, variant, width }) => ({
      borderColor: color,
      borderStyle: variant,
      borderWidth: width,
    }),
    'span',
  );
  const instance = isString(children) ? false : React.Children.only(children);

  return (
    <StyleProvider>
      <WithBorder {...rest} {...children.props} instance={instance}>
        {instance ? children.props.children : children}
      </WithBorder>
    </StyleProvider>
  );
};
Border.propTypes = {
  /** Color of the border. */
  color: PropTypes.string,
  /** Single render-able node to which the border will apply. */
  children: PropTypes.node.isRequired,
  /** Variant (border-style CSS) of the border. */
  variant: PropTypes.string,
  /** Width of the border. */
  width: PropTypes.number,
};
Border.defaultProps = {
  color: 'transparent',
  variant: 'solid',
  width: 1,
};

export default Border;
