import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIAnalyticsEvent from './UIAnalyticsEvent';

export default (eventsMap = {}) => WrappedComponent => {
  class WrappedComponentWithAnalytics extends Component {
    render() {
      const props = { ...this.props, ...this.mapEvents() };
      return (
        <WrappedComponent
          {...props}
          createAnalyticsEvent={this.createAnalyticsEvent}
        />
      );
    }

    createAnalyticsEvent = payload => {
      const { getAnalyticsEventHandlers, getAnalyticsContext } = this.context;

      const context =
        (typeof getAnalyticsContext === 'function' && getAnalyticsContext()) ||
        [];
      const handlers =
        (typeof getAnalyticsEventHandlers === 'function' &&
          getAnalyticsEventHandlers()) ||
        [];
      return new UIAnalyticsEvent({ context, handlers, payload });
    };

    mapEvents = () =>
      Object.keys(eventsMap).reduce((acc, propCallbackName) => {
        const eventCreator = eventsMap[propCallbackName];
        if (!['object', 'function'].includes(typeof eventCreator)) {
          return acc;
        }
        // eslint-disable-next-line react/destructuring-assignment
        const providedPropCallback = this.props[propCallbackName];
        const modifiedCallback = (...args) => {
          const analyticsEvent =
            typeof eventCreator === 'function'
              ? eventCreator(this.createAnalyticsEvent, this.props)
              : this.createAnalyticsEvent(eventCreator);

          if (providedPropCallback) {
            providedPropCallback(...args, analyticsEvent);
          }
        };

        return {
          ...acc,
          [propCallbackName]: modifiedCallback,
        };
      }, {});
  }
  WrappedComponentWithAnalytics.displayName = `${WrappedComponent.displayName ||
    WrappedComponent.name}`;
  WrappedComponentWithAnalytics.contextTypes = {
    getAnalyticsEventHandlers: PropTypes.func,
    getAnalyticsContext: PropTypes.func,
  };
  WrappedComponentWithAnalytics.propTypes = WrappedComponent.propTypes;
  WrappedComponentWithAnalytics.defaultProps = WrappedComponent.defaultProps;

  return WrappedComponentWithAnalytics;
};
