import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { AnalyticsListener, withAnalytics } from '../src/index';

class SaveButtonBase extends Component {
  static propTypes = {
    createAnalyticsEvent: PropTypes.func,
  };

  handleClick = () => {
    const evt = this.props.createAnalyticsEvent({ action: 'Save' });
    evt.fire('Workitem');
  }

  render() {
    return (
      <button onClick={this.handleClick}>Save</button>
    );
  }
}

const SaveButton = withAnalytics()(SaveButtonBase);

export default class App extends Component {
  handleAnalyticsEvent = analyticsEvt => {
    console.log(analyticsEvt.context, analyticsEvt.payload);
  }

  render() {
    return (
      <AnalyticsListener channel="Workitem" onEvent={this.handleAnalyticsEvent}>
        <SaveButton />
      </AnalyticsListener>
    )
  }
}
