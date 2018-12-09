import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import { Consumer } from './CarouselContext';
import { Consumer as ViewportConsumer } from './CarouselViewportContext';

const Item = createComponent(
  ({ height, width }) => ({
    display: 'inline-block',
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
        {({ currentIndex, itemIds, registerItem }) => {
          registerItem(this);

          return (
            <StyleProvider>
              <ViewportConsumer>
                {({ height, width }) => (
                  <Item
                    height={height}
                    isCurrent={itemIds[currentIndex] === id}
                    isPrevious={itemIds.indexOf(id) < currentIndex}
                    width={width}
                  >
                    {children}
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
