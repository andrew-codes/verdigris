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
      <button onClick={this.handleClick}>Save</button>
    );
  }

  handleClick = evt => {
    const analyticsEvt = this.props.createAnalyticsEvent({ action: 'Save' });
    this.props.onClick(evt, analyticsEvt);
  }
}


const SaveButton = withAnalytics()(SaveButtonBase);

const WorkitemForm = () => {
  const handleClick = (evt, analyticsEvt) => {
    analyticsEvt.update({
      updatedViaValue: true,
    });
    analyticsEvt.update(value => ({
      ...value,
      updatedViaFunc: true,
    }));
    analyticsEvt.fire('Workitem');
    analyticsEvt.update({
      cannotUpdateAfterFiringEvent: 'warning message in console.',
    });
  };

  return (
    <div>
      <SaveButton onClick={handleClick} />
    </div>
  );
}

export default class App extends Component {
  render() {
    return (
      <AnalyticsListener channel="Workitem" onEvent={this.handleAnalyticsEvent}>
        <WorkitemForm />
      </AnalyticsListener>
    )
  }

  handleAnalyticsEvent = analyticsEvt => {
    console.log(analyticsEvt.context, analyticsEvt.payload);
  }
}
