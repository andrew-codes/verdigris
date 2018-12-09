import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import Carousel from '@andrew-codes/verdigris-carousel';

/* eslint-disable react/prop-types */
const WizardImpl = ({ children, direction, goBack, goForwardTo }) => {
  return (
    <Carousel direction={direction}>
      {({
        currentIndex,
        goBack: carouselGoBack,
        goForward,
        itemIds,
        items,
        totalItems,
      }) => {
        const currentItemId = itemIds[currentIndex];
        const currentItem = items[currentItemId];
        const computedNextItemId = currentItem
          ? currentItem.props.onNext() || null
          : null;

        const computedNextIndex = computedNextItemId
          ? itemIds.indexOf(computedNextItemId)
          : -1;
        const nextStepIndex =
          computedNextIndex && computedNextIndex > currentIndex
            ? computedNextIndex
            : Math.min(totalItems - 1, currentIndex + 1);

        const isValid = currentItem ? currentItem.props.onValidate() : true;

        return (
          <div>
            {children({
              currentStepIndex: currentIndex,
              goBack: () => {
                const lastIndex = goBack();
                for (let index = currentIndex; index > lastIndex; index--) {
                  setTimeout(carouselGoBack, 0);
                }
              },
              goForward: () => {
                if (!isValid) return;
                goForwardTo(nextStepIndex);
                for (let index = currentIndex; index < nextStepIndex; index++) {
                  setTimeout(goForward, 0);
                }
              },
              isValid,
              totalSteps: totalItems,
            })}
          </div>
        );
      }}
    </Carousel>
  );
};
/* eslint-enable react/prop-types */

class Wizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [0],
    };
    renderToString(<WizardImpl {...props} />);
    this.goBack = this.goBack.bind(this);
    this.goForwardTo = this.goForwardTo.bind(this);
  }

  render() {
    const { children } = this.props;

    return (
      <WizardImpl goBack={this.goBack} goForwardTo={this.goForwardTo}>
        {children}
      </WizardImpl>
    );
  }

  goBack() {
    const { history } = this.state;
    if (history.length === 0) {
      return 0;
    }
    const lastIndex = history.length - 1;
    const lastStep = history[lastIndex - 1];
    this.setState(({ history: stateHistory }) => ({
      history: stateHistory.slice(0, lastIndex),
    }));
    return lastStep;
  }

  goForwardTo(nextIndex) {
    this.setState(({ history }) => ({
      history: history.concat([nextIndex]),
    }));
  }
}
Wizard.propTypes = {
  /** Render prop; params: { currentStepId, currentStepIndex, goBack, goForward, isValid, totalSteps } */
  children: PropTypes.func.isRequired,
  /** Direction of the progression of the Wizard; null is considered in-place. */
  direction: PropTypes.oneOf(['horizontal', 'vertical', null]),
};
Wizard.defaultProps = {
  direction: null,
};

export default Wizard;
