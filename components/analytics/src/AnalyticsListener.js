import React, { createContext, Children } from 'react';
import PropTypes from 'prop-types';

const { Consumer, Provider } = createContext();

const getAnalyticsEventHandlers = (
  getAnalyticsEventHandlersValue,
  channel,
  onEvent,
) => () => {
  const parentEventHandlers =
    typeof getAnalyticsEventHandlersValue === 'function'
      ? getAnalyticsEventHandlersValue()
      : [];

  const handler = (event, eventChannel) => {
    if (channel === '*' || channel === eventChannel) {
      onEvent(event, eventChannel);
    }
  };
  return [handler, ...parentEventHandlers];
};

const AnalyticsListener = ({ children, channel, onEvent }) => (
  <Consumer>
    {getAncestorAnalyticsEventHandlers => (
      <Provider
        value={getAnalyticsEventHandlers(
          getAncestorAnalyticsEventHandlers,
          channel,
          onEvent,
        )}
      >
        {Children.only(children)}
      </Provider>
    )}
  </Consumer>
);
AnalyticsListener.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * invoked by fired events on specified channel
   */
  onEvent: PropTypes.func.isRequired,
  /**
   * used to filter the handling of analytics events
   */
  channel: PropTypes.string,
};
AnalyticsListener.defaultProps = {
  channel: '*',
};
export default AnalyticsListener;
export const WithAnalyticsListener = Consumer;
