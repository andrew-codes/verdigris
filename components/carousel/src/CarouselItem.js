import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import { Slide } from '@andrew-codes/verdigris-animation';
import { Consumer } from './CarouselContext';
import { Consumer as ViewportConsumer } from './CarouselViewportContext';

const Item = createComponent(
  ({ height, width }) => ({
    display: 'block',
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
        {({
          Animation,
          animationDuration,
          currentId,
          itemOrder,
          isNavigatingBack,
          isNavigatingForward,
          nextId,
          previousId,
          registerItem,
        }) => {
          registerItem(this);
          return (
            <StyleProvider>
              <ViewportConsumer>
                {({ height, width }) => {
                  return (
                    <Item height={height} width={width}>
                      <Slide
                        direction="up"
                        distance={itemOrder.indexOf(id) * height}
                        duration={0}
                      >
                        {Animation({
                          animationDuration,
                          children,
                          currentId,
                          height,
                          id,
                          itemOrder,
                          isNavigatingBack,
                          isNavigatingForward,
                          nextId,
                          previousId,
                          width,
                        })}
                      </Slide>
                    </Item>
                  );
                }}
              </ViewportConsumer>
            </StyleProvider>
          );
        }}
      </Consumer>
    );
  }
}
CarouselItem.propTypes = {
  /** Function to render as the item content. Function receives relevant values for rendering animations. */
  children: PropTypes.node,
  /** Unique identifier for the item. */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
CarouselItem.defaultProps = {};

export default CarouselItem;
