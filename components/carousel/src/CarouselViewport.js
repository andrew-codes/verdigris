import Mask from '@andrew-codes/verdigris-mask';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Rect from '@andrew-codes/verdigris-rect';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import CarouselItem from './CarouselItem';
import { Provider } from './CarouselViewportContext';
import { Consumer } from './CarouselContext';
import { horizontal } from './CarouselDirections';

const Tray = createComponent(
  ({ height, width }) => ({
    height,
    width,
  }),
  'div',
);

class CarouselViewport extends Component {
  render() {
    const { children } = this.props;

    return (
      <StyleProvider>
        <Consumer>
          {({ direction, itemIds }) => (
            <Rect>
              {({ ref, rect }) => (
                <Mask height={rect.height} width={rect.width} innerRef={ref}>
                  <Provider
                    value={{
                      height: rect.height,
                      width: rect.width,
                    }}
                  >
                    <Tray
                      height={
                        direction === horizontal
                          ? rect.height
                          : rect.height * itemIds.length
                      }
                      width={
                        direction === horizontal
                          ? rect.width * itemIds.length
                          : rect.width
                      }
                    >
                      {children}
                    </Tray>
                  </Provider>
                </Mask>
              )}
            </Rect>
          )}
        </Consumer>
      </StyleProvider>
    );
  }
}
CarouselViewport.propTypes = {
  /** Items to be shown in the Carousel.  */
  children: PropTypes.arrayOf(PropTypes.instanceOf(CarouselItem)),
};
CarouselViewport.defaultProps = {};

export default CarouselViewport;
