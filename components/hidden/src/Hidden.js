import isString from 'lodash.isstring';
import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const Hidden = ({ children, fromScreenReader, ...rest }) => {
  const VisuallyHidden = createComponent(
    ({ 'aria-hidden': hiddenFromScreenReader }) =>
      !hiddenFromScreenReader
        ? {
            clip: 'rect(1px, 1px, 1px, 1px)',
            height: '1px',
            overflow: 'hidden',
            position: 'absolute',
            width: '1px',
            ':focus': {
              height: 'auto',
              position: 'static',
              width: 'auto',
            },
          }
        : {},
    'span',
    ['aria-hidden'],
  );
  const instance = isString(children) ? false : React.Children.only(children);

  return (
    <StyleProvider>
      <VisuallyHidden
        {...rest}
        {...children.props}
        aria-hidden={fromScreenReader}
        instance={instance}
      >
        {instance ? children.props.children : children}
      </VisuallyHidden>
    </StyleProvider>
  );
};
Hidden.propTypes = {
  /** Single render-able node that should be hidden. */
  children: PropTypes.node.isRequired,
  /** When true, hides from screen readers instead of visually. */
  fromScreenReader: PropTypes.bool,
};
Hidden.defaultProps = {
  fromScreenReader: false,
};

export default Hidden;
