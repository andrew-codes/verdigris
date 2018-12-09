import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import ApplyStyleRule from '@andrew-codes/verdigris-apply-style-rule';

const visuallyHidden = ({ 'aria-hidden': hiddenFromScreenReader }) =>
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
    : {};

const Hidden = ({ children, fromScreenReader, ...rest }) => {
  return (
    <StyleProvider>
      <ApplyStyleRule
        {...rest}
        {...children.props}
        aria-hidden={fromScreenReader}
        passThroughProps={['aria-hidden']}
        styleRule={visuallyHidden}
      >
        {children}
      </ApplyStyleRule>
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
