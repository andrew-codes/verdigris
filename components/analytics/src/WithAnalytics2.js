import React from 'react';
import PropTypes from 'prop-types';
import UIAnalyticsEvent from './UIAnalyticsEvent';
import { WithAnalyticsContext } from './AnalyticsContext';
import { WithAnalyticsListener } from './AnalyticsListener';

const createAnalyticsEvent = (
  getAnalyticsEventHandlers,
  getAnalyticsContext,
) => payload => {
  const context =
    (typeof getAnalyticsContext === 'function' && getAnalyticsContext()) || [];
  const handlers =
    (typeof getAnalyticsEventHandlers === 'function' &&
      getAnalyticsEventHandlers()) ||
    [];
  return new UIAnalyticsEvent({ context, handlers, payload });
};

const WithAnalytics = ({ children }) => {
  return (
    <WithAnalyticsContext>
      {getAnalyticsContext => (
        <WithAnalyticsListener>
          {getAnalyticsEventHandlers =>
            children(
              createAnalyticsEvent(
                getAnalyticsEventHandlers,
                getAnalyticsContext,
              ),
            )
          }
        </WithAnalyticsListener>
      )}
    </WithAnalyticsContext>
  );
};
WithAnalytics.propTypes = {
  /** function child that will receive an analytics event. */
  children: PropTypes.func.isRequired,
};

export default WithAnalytics;
