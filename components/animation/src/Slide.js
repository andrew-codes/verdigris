import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const horizontal = ['left', 'right'];
const negativeDistance = ['left', 'top'];
const Slider = createComponent(({ direction, distance, speed }) => {
  const actualDistance = negativeDistance.includes(direction)
    ? -distance
    : distance;
  return {
    transform: horizontal.includes(direction)
      ? `translateX(${actualDistance}px)`
      : `translateY(${actualDistance}px)`,
    transition: `${speed}ms ease-in-out`,
  };
}, 'div');

const Slide = ({ children, ...rest }) => (
  <StyleProvider>
    <Slider {...rest}>{children}</Slider>
  </StyleProvider>
);
Slide.propTypes = {
  /** Node to animate. */
  children: PropTypes.node,
  /** Direction in which to slide children. */
  direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  /** Distance to slide children. */
  distance: PropTypes.number,
  /** Speed in which to animate. */
  speed: PropTypes.number,
};
Slide.defaultProps = {
  direction: 'right',
  distance: 0,
  speed: 1000,
};
Slide.themeDefinition = {};
Slide.defaultThemeValues = {};

export default Slide;
