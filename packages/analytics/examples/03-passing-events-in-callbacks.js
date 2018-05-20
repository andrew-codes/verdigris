import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {
  AnalyticsListener,
  withAnalytics
} from '../src/index';

class ButtonBase extends Component {
  render() {
    const { createAnalyticsEvent, ...props } = this.props;

    return (
      <button {...props} />
    );
  }
}

class SaveButtonBase extends Component {
  static propTypes = {
    createAnalyticsEvent: PropTypes.func,
  };

  render() {
    const { createAnalyticsEvent, ...props } = this.props;

    return (
      <button {...props} onClick={this.handleClick} />
    );
  }

  handleClick = (evt) => {
    const analyticsEvt = this.props.createAnalyticsEvent({ action: 'Save' });
    this.props.onClick(evt, analyticsEvt);
  }
}

const SaveButton = withAnalytics()(SaveButtonBase);
const SaveButtonEventMapFuncs = withAnalytics({
  onClick: create => create({ action: 'Save', control: 'SaveButtonEventMapFuncs' }),
})(ButtonBase);
const SaveButtonEventMapObjs = withAnalytics({
  onClick: { action: 'Save', control: 'SaveButtonEventMapObjs' },
})(ButtonBase);

const ButtonGroup = () => {
  const onClick = (e, analyticsEvent) => analyticsEvent.fire('Workitem');
  return (
    <div>
      <div>
        <SaveButton onClick={onClick}>
          Manually passing up event
        </SaveButton>
      </div>
      <div>
        <SaveButtonEventMapFuncs onClick={onClick}>
          Using an event map with functions to create analytics events.
        </SaveButtonEventMapFuncs>
      </div>
      <div>
        <SaveButtonEventMapObjs onClick={onClick}>
          Using an event map with objects to define analytics events.
        </SaveButtonEventMapObjs>
      </div>
    </div>
  );
}

export default class App extends Component {
  render() {
    return (
      <AnalyticsListener channel="Workitem" onEvent={this.handleAnalyticsEvent}>
        <ButtonGroup />
      </AnalyticsListener >
    )
  }

  handleAnalyticsEvent = analyticsEvt => {
    console.log(analyticsEvt.context, analyticsEvt.payload);
  }

}
