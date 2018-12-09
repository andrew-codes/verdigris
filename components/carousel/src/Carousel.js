import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from './CarouselContext';

const getNextIndex = (items, currentIndex) =>
  Math.min(items.length - 1, currentIndex + 1);
const getPreviousIndex = (items, currentIndex) => Math.max(0, currentIndex - 1);

/* eslint-disable react/prop-types */
const Children = ({
  children,
  currentIndex,
  goBack,
  goForward,
  itemIds,
  items,
  registerItem,
  transitionSpeed,
}) => {
  return (
    <Provider
      value={{
        currentIndex,
        itemIds,
        items,
        registerItem,
        transitionSpeed,
      }}
    >
      {children({
        currentIndex,
        goBack,
        goForward,
        totalItems: itemIds.length,
      })}
    </Provider>
  );
};
/* eslint-enable react/prop-types */

const reducer = (state, { payload, type }) => {
  if (type === 'goTo') {
    return {
      ...state,
      currentIndex: payload,
    };
  }
  return state;
};

class Carousel extends Component {
  constructor(props) {
    super(props);

    const currentIndex = 0;
    this.state = {
      currentIndex,
    };

    this.items = {};
    this.itemIds = [];
    this.dispatch = this.dispatch.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.registerItem = this.registerItem.bind(this);

    renderToString(
      <Children
        {...props}
        currentIndex={currentIndex}
        registerItem={this.registerItem}
        itemIds={this.itemIds}
        items={this.items}
      />,
    );
  }

  render() {
    const { children, transitionSpeed } = this.props;
    const { currentIndex } = this.state;

    return (
      <Children
        currentIndex={currentIndex}
        goBack={this.goBack}
        goForward={this.goForward}
        itemIds={this.itemIds}
        items={this.items}
        registerItem={this.registerItem}
        transitionSpeed={transitionSpeed}
      >
        {children}
      </Children>
    );
  }

  dispatch(action) {
    return this.setState(state => reducer(state, action));
  }

  goBack() {
    const { currentIndex } = this.state;
    this.dispatch({
      type: 'goTo',
      payload: getPreviousIndex(this.itemIds, currentIndex),
    });
  }

  goForward() {
    const { currentIndex } = this.state;
    this.dispatch({
      type: 'goTo',
      payload: getNextIndex(this.itemIds, currentIndex),
    });
  }

  registerItem(item) {
    if (!this.itemIds.includes(item.props.id)) {
      this.itemIds.push(item.props.id);
    }
    this.items[item.props.id] = item;
  }
}
Carousel.propTypes = {
  /** Render prop; params: { currentStepIndex, goBack, goForward, totalItems } */
  children: PropTypes.func.isRequired,
  /** Time, in ms, to transition to the next item. */
  transitionSpeed: PropTypes.number,
};
Carousel.defaultProps = {
  transitionSpeed: 1000,
};

export default Carousel;
