import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { AnalyticsListener, withAnalytics } from '../src/index';

class LoginButton extends Component {
  static propTypes = {
    createAnalyticsEvent: PropTypes.func,
  };

  handleClick = () => {
    const evt = this.props.createAnalyticsEvent({ action: 'LoginButtonClick' });
    evt.fire('Login');
  }

  render() {
    return (
      <button onClick={this.handleClick}>Login</button>
    );
  }
}

const LoginButtonWithAnalytics = withAnalytics()(LoginButton);

export default class LoginForm extends Component {
  handleAnalyticsEvent = analyticsEvt => {
    console.log(analyticsEvt);
  }

  render() {
    return (
      <AnalyticsListener channel="Login" onEvent={this.handleAnalyticsEvent}>
        <LoginButtonWithAnalytics />
      </AnalyticsListener>
    )
  }
}
