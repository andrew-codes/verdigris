import PropTypes from 'prop-types';
import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import { renderToString } from 'react-dom/server';
import { Provider } from './CarouselContext';

const forward = 'forward';
const back = 'back';

const getCurrentIndex = (currentId, itemOrder) =>
  currentId ? itemOrder.indexOf(currentId) : 0;
const getCurrentId = (currentId, itemOrder) =>
  itemOrder[getCurrentIndex(currentId, itemOrder)];
const getNextId = (currentId, itemOrder) => {
  const currentIndex = getCurrentIndex(currentId, itemOrder);
  const nextIndex = currentIndex + 1;
  return nextIndex < itemOrder.length ? itemOrder[nextIndex] : null;
};
const getPreviousId = (currentId, itemOrder) => {
  const currentIndex = getCurrentIndex(currentId, itemOrder);
  const previousIndex = currentIndex - 1;
  return previousIndex >= 0 ? itemOrder[previousIndex] : null;
};

/* eslint-disable react/prop-types */
const Children = ({
  Animation,
  animationDuration,
  children,
  currentId,
  goBack,
  goForward,
  navigationDirection,
  itemOrder,
  items,
  registerItem,
}) => {
  return (
    <Provider
      value={{
        Animation,
        currentId,
        animationDuration,
        itemOrder,
        items,
        isNavigatingForward: navigationDirection === forward,
        isNavigatingBack: navigationDirection === back,
        navigationDirection,
        nextId: getNextId(currentId, itemOrder),
        previousId: getPreviousId(currentId, itemOrder),
        registerItem,
      }}
    >
      {children({
        currentId,
        goBack,
        goForward,
        itemOrder,
        items,
      })}
    </Provider>
  );
};
/* eslint-enable react/prop-types */

const reducer = (state, { payload: { currentId, itemOrder }, type }) => {
  if (type === forward) {
    const nextId = getNextId(currentId, itemOrder);
    return {
      ...state,
      currentId: nextId || currentId,
      navigationDirection: forward,
    };
  }
  if (type === back) {
    const previousId = getPreviousId(currentId, itemOrder);
    return {
      ...state,
      currentId: previousId || currentId,
      navigationDirection: back,
    };
  }
  return {
    ...state,
    navigationDirection: null,
  };
};

class Carousel extends Component {
  constructor(props) {
    super(props);

    const currentId = null;
    this.state = {
      currentId,
      navigationDirection: null,
    };

    this.items = {};
    this.itemOrder = [];
    this.dispatch = this.dispatch.bind(this);
    this.goBack = throttle(this.goBack.bind(this), props.animationDuration);
    this.goForward = throttle(
      this.goForward.bind(this),
      props.animationDuration,
    );
    this.registerItem = this.registerItem.bind(this);

    renderToString(
      <Children
        {...props}
        currentId={currentId}
        registerItem={this.registerItem}
        itemOrder={this.itemOrder}
        items={this.items}
      />,
    );
  }

  render() {
    const { Animation, animationDuration, children } = this.props;
    const { currentId, navigationDirection } = this.state;

    return (
      <Children
        Animation={Animation}
        animationDuration={animationDuration}
        currentId={getCurrentId(currentId, this.itemOrder)}
        goBack={this.goBack}
        goForward={this.goForward}
        navigationDirection={navigationDirection}
        itemOrder={this.itemOrder}
        items={this.items}
        registerItem={this.registerItem}
      >
        {children}
      </Children>
    );
  }

  dispatch(action) {
    this.setState(state => {
      return reducer(state, action);
    });
  }

  goBack() {
    const { currentId } = this.state;
    this.dispatch({
      type: back,
      payload: { currentId, itemOrder: this.itemOrder },
    });
  }

  goForward() {
    const { currentId } = this.state;
    this.dispatch({
      type: forward,
      payload: { currentId, itemOrder: this.itemOrder },
    });
  }

  registerItem(item) {
    if (!this.itemOrder.includes(item.props.id)) {
      this.itemOrder.push(item.props.id);
    }
    this.items[item.props.id] = item;
  }
}
Carousel.propTypes = {
  Animation: PropTypes.func,
  animationDuration: PropTypes.number,
  /** Render prop; params: { currentStepIndex, goBack, goForward, totalItems } */
  children: PropTypes.func.isRequired,
};
Carousel.defaultProps = {
  Animation: ({ children, currentId, id }) =>
    currentId === id ? children : null,
  animationDuration: 0,
};

export default Carousel;
