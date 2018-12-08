import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import {
  createComponent,
  styleUtils,
} from '@andrew-codes/verdigris-style-container';

const Viewport = createComponent(({ circular, height, width }) => {
  return {
    height,
    overflow: 'hidden',
    position: 'relative',
    width,
    ...styleUtils.conditionalStyle(circular, 'borderRadius', height / 2),
  };
}, 'div');

const Mask = ({ children, ...rest }) => (
  <StyleProvider>
    <Viewport {...rest}>{children}</Viewport>
  </StyleProvider>
);
Mask.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
Mask.defaultProps = {};

export default Mask;
