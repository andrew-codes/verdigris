import React from 'react';
import { Slide } from '@andrew-codes/verdigris-animation';

const HorizontalAnimation = ({
  animationDuration,
  children,
  currentId,
  id,
  isNavigatingBack,
  isNavigatingForward,
  nextId,
  previousId,
  width,
}) => {
  let animatingIds = [];
  if (isNavigatingBack) {
    animatingIds = [currentId, nextId];
  } else if (isNavigatingForward) {
    animatingIds = [currentId, previousId];
  }
  const renderedItems = [currentId, previousId, nextId];
  let offsetMultiplier = 0;
  if (!isNavigatingForward && !isNavigatingBack) {
    if (id === currentId) {
      offsetMultiplier = 0;
    } else {
      offsetMultiplier = 1;
    }
  } else if (isNavigatingForward) {
    if (id === previousId) {
      offsetMultiplier = 0;
    } else {
      offsetMultiplier = 1;
    }
  } else if (isNavigatingBack) {
    if (id === nextId) {
      offsetMultiplier = 0;
    } else {
      offsetMultiplier = -1;
    }
  }

  // if (id === previousId) {
  // } else if (isNavigatingForward && id === nextId) {
  //   offsetMultiplier = 1;
  // }

  return renderedItems.includes(id) ? (
    <Slide
      direction="right"
      distance={offsetMultiplier * width}
      duration={animationDuration}
    >
      <Slide
        direction={isNavigatingForward ? 'left' : 'right'}
        distance={animatingIds.includes(id) ? width : 0}
        duration={animationDuration}
      >
        {children}
      </Slide>
    </Slide>
  ) : null;
};
export default HorizontalAnimation;
