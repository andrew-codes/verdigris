import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const horizontal = ['left', 'right'];
const negativeDistance = ['left', 'up'];
const Slider = createComponent(({ direction, distance, duration }) => {
  const actualDistance = negativeDistance.includes(direction)
    ? -distance
    : distance;
  return {
    transform: horizontal.includes(direction)
      ? `translateX(${actualDistance}px)`
      : `translateY(${actualDistance}px)`,
    transitionTimingFunction: `ease-in-out`,
    transitionDuration: `${duration}ms`,
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
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  /** Distance to slide children. */
  distance: PropTypes.number.isRequired,
  /** Duration (in ms) for animation to occur. */
  duration: PropTypes.number.isRequired,
};
Slide.defaultProps = {
  direction: 'right',
};

export default Slide;
