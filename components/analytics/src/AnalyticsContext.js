import React, { createContext, Children } from 'react';
import PropTypes from 'prop-types';

const { Consumer, Provider } = createContext();

const getAnalyticsContext = (getAncestorAnalyticsContext, data) => () => {
  const ancestorData =
    typeof getAncestorAnalyticsContext === 'function'
      ? getAncestorAnalyticsContext()
      : [];
  return [...ancestorData, data];
};

const AnalyticsContext = ({ children, data }) => {
  return (
    <Consumer>
      {getAnalyticsContextValue => (
        <Provider value={getAnalyticsContext(getAnalyticsContextValue, data)}>
          {Children.only(children)}
        </Provider>
      )}
    </Consumer>
  );
};
AnalyticsContext.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * additional data to be passed along as context to fired analytics events
   */
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};
export default AnalyticsContext;
export const WithAnalyticsContext = Consumer;
