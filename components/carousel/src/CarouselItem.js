import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import { Slide } from '@andrew-codes/verdigris-animation';
import { Consumer } from './CarouselContext';
import { Consumer as ViewportConsumer } from './CarouselViewportContext';

const Item = createComponent(
  ({ direction, height, width }) => ({
    display: direction === 'horizontal' ? 'inline-block' : 'block',
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

          return (
            <StyleProvider>
              <ViewportConsumer>
                {({ height, width }) => (
                  <Item
                    direction={direction}
                    height={height}
                    isCurrent={itemIds[currentIndex] === id}
                    isPrevious={itemIds.indexOf(id) < currentIndex}
                    width={width}
                  >
                    <Slide
                      direction={direction === 'horizontal' ? 'left' : 'top'}
                      distance={
                        currentIndex *
                        (direction === 'horizontal' ? width : height)
                      }
                    >
                      {children}
                    </Slide>
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
