import isString from 'lodash.isstring';
import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const ComponentStyles = ({
  children,
  styleRule,
  passThroughProps,
  ...rest
}) => {
  const Impl = createComponent(styleRule, 'span', passThroughProps);
  const instance = isString(children) ? false : React.Children.only(children);

  return (
    <StyleProvider>
      <Impl
        {...rest}
        {...children.props}
        instance={instance}
        passThroughProps={passThroughProps}
      >
        {instance ? children.props.children : children}
      </Impl>
    </StyleProvider>
  );
};
ComponentStyles.propTypes = {
  /** Single render-able node that should to have styled applied. */
  children: PropTypes.node.isRequired,
  /** Pass through props. */
  passThroughProps: PropTypes.arrayOf(PropTypes.string),
  /** Style rule to apply to children prop node. */
  styleRule: PropTypes.func.isRequired,
};

ComponentStyles.defaultProps = {
  passThroughProps: [],
};
export default ComponentStyles;
