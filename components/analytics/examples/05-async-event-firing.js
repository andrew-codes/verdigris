import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {
  AnalyticsContext,
  AnalyticsListener,
  withAnalytics
} from '../src/index';

class SaveButtonBase extends Component {
  static propTypes = {
    createAnalyticsEvent: PropTypes.func,
  };

  handleClick = evt => {
    const analyticsEvt = this.props.createAnalyticsEvent({ action: 'Save' });
    this.props.onClick(evt, analyticsEvt);
  }

  render() {
    return (
      <button onClick={this.handleClick}>Save</button>
    );
  }
}
const SaveButton = withAnalytics()(SaveButtonBase);

class WorkitemForm extends Component {
  componentWillUnmount() {
    console.log('WorkitemForm will unmount');
  }

  render() {
    return (
      <AnalyticsListener channel="Workitem" onEvent={this.handleAnalyticsEvent}>
        <AnalyticsContext data={{ form: 'Workitem', formAction: 'new' }}>
          <SaveButton onClick={this.handleSaveClick} />
        </AnalyticsContext>
      </AnalyticsListener>
    );
  }

  handleSaveClick = (evt, analyticsEvt) => {
    this.props.onSave(evt, analyticsEvt);
  };

  handleAnalyticsEvent = analyticsEvt => {
    console.log(analyticsEvt.context, analyticsEvt.payload);
  };
}

export default class App extends Component {
  state = {
    saved: false,
  };

  render() {
    return this.state.saved
      ? <span>Saved!</span>
      : <WorkitemForm onSave={this.handleSave} />;
  }

  handleSave = (evt, analyticsEvt) => {
    this.dispatchSave(analyticsEvt);
    this.setState({
      saved: true,
    });
  }

  dispatchSave = analyticsEvt => new Promise(resolve => setTimeout(() => {
    const newWorkitemOidFromServer = 'Workitem:1234';
    resolve(newWorkitemOidFromServer);
  }, 10))
    .then(workitemOid => {
      analyticsEvt.update({
        workitemOid,
      });
      analyticsEvt.fire('Workitem');
    })
}
