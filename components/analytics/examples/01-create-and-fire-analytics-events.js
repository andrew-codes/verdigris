import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {
  AnalyticsListener,
  withAnalytics
} from '../src/index';

class SaveButtonBase extends Component {
  static propTypes = {
    createAnalyticsEvent: PropTypes.func,
  };

  render() {
    return (
      <button onClick={this.handleClick}>Fire Workitem Channel Analytics Event</button>
    );
  }

  handleClick = () => {
    const analyticsEvt = this.props.createAnalyticsEvent({ action: 'Save' });
    analyticsEvt.fire('Workitem');
  }
}

const SaveButton = withAnalytics()(SaveButtonBase);

export default class App extends Component {
  render() {
    return (
      <AnalyticsListener channel="Workitem" onEvent={this.handleWorkitemAnalyticsEvent}>
        <AnalyticsListener channel="Scope" onEvent={this.handleScopeAnalyticsEvent}>
          <SaveButton />
        </AnalyticsListener>
      </AnalyticsListener>
    )
  }

  handleWorkitemAnalyticsEvent = analyticsEvt => {
    console.log(analyticsEvt.context, analyticsEvt.payload);
  }

  handleScopeAnalyticsEvent = analyticsEvt => {
    console.log(false);
  }
}
