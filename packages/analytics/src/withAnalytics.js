import React, { Component } from 'react';

export default () => WrappedComponent => class extends Component {
  static displayName = `WithAnalytics(${WrappedComponent.displayName || WrappedComponent.name})`;
  render() {
    return (
      <WrappedComponent {...this.props} />
    );
  }
}
