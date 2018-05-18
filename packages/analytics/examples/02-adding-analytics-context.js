import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { AnalyticsContext, AnalyticsListener, withAnalytics } from '../src/index';

class SaveButton extends Component {
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

const SaveButtonWithAnalytics = withAnalytics()(SaveButton);

export default class LoginForm extends Component {
  handleAnalyticsEvent = analyticsEvt => {
    console.log(analyticsEvt.context, analyticsEvt.payload);
  }

  render() {
    return (
      <AnalyticsListener channel="Workitem" onEvent={this.handleAnalyticsEvent}>
        <AnalyticsContext data={{ oid: 'Workitem:1' }}>
          <AnalyticsContext data={{ room: 'Room:2' }}>
            <SaveButtonWithAnalytics />
          </AnalyticsContext>
        </AnalyticsContext>
      </AnalyticsListener >
    )
  }
}
