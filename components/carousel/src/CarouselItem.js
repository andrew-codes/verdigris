import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import { Slide } from '@andrew-codes/verdigris-animation';
import { Consumer } from './CarouselContext';
import { Consumer as ViewportConsumer } from './CarouselViewportContext';
import { horizontal, inPlace } from './CarouselDirections';

const Item = createComponent(
  ({ direction, height, width }) => ({
    display: direction === horizontal ? 'inline-block' : 'block',
    height,
    width,
  }),
  'div',
);

class CarouselItem extends Component {
  render() {
    const { children, id } = this.props;
    return (
      <Consumer>
        {({ currentIndex, direction, itemIds, registerItem }) => {
          registerItem(this);
          const isCurrent = itemIds[currentIndex] === id;

          return direction === inPlace && !isCurrent ? null : (
            <StyleProvider>
              <ViewportConsumer>
                {({ height, width }) => (
                  <Item
                    direction={direction}
                    height={height}
                    isCurrent={isCurrent}
                    isPrevious={itemIds.indexOf(id) < currentIndex}
                    width={width}
                  >
                    {direction === inPlace ? (
                      children
                    ) : (
                      <Slide
                        direction={direction === horizontal ? 'left' : 'top'}
                        distance={
                          currentIndex *
                          (direction === horizontal ? width : height)
                        }
                      >
                        {children}
                      </Slide>
                    )}
                  </Item>
                )}
              </ViewportConsumer>
            </StyleProvider>
          );
        }}
      </Consumer>
    );
  }
}
CarouselItem.propTypes = {
  /** Node to render as the item content. */
  children: PropTypes.node,
  /** Unique identifier for the item. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
CarouselItem.defaultProps = {};

export default CarouselItem;
