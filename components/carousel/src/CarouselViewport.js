import Mask from '@andrew-codes/verdigris-mask';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Rect from '@andrew-codes/verdigris-rect';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import { Provider } from './CarouselViewportContext';
import { Consumer } from './CarouselContext';
import CarouselItem from './CarouselItem';

const SliderTray = createComponent(
  ({ height, offset, transitionSpeed, width }) => ({
    height,
    transform: `translateX(${offset}px)`,
    width,
    transition: `${transitionSpeed}ms ease-in-out`,
  }),
  'div',
);

class CarouselViewport extends Component {
  render() {
    const { children } = this.props;

    return (
      <StyleProvider>
        <Consumer>
          {({ currentIndex, itemIds, transitionSpeed }) => (
            <Rect>
              {({ ref, rect }) => (
                <Mask height={rect.height} width={rect.width} innerRef={ref}>
                  <Provider
                    value={{
                      height: rect.height,
                      width: rect.width,
                    }}
                  >
                    <SliderTray
                      height={rect.height}
                      offset={currentIndex * -rect.width}
                      transitionSpeed={transitionSpeed}
                      width={itemIds.length * rect.width}
                    >
                      {children}
                    </SliderTray>
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
  children: PropTypes.instanceOf(CarouselItem),
};
CarouselViewport.defaultProps = {};

export default CarouselViewport;
