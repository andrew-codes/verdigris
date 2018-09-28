import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getComponentDisplayName from '../getComponentDisplayName';

const withRenderer = ComponentToWrap => {
  class WithRendererComponent extends Component {
    render() {
      const { renderer } = this.context;

      return <ComponentToWrap renderer={renderer} {...this.props} />;
    }
  }
  WithRendererComponent.displayName = `WithRenderer${getComponentDisplayName(
    ComponentToWrap,
  )}`;
  WithRendererComponent.propTypes = ComponentToWrap.propTypes;
  WithRendererComponent.contextTypes = { renderer: PropTypes.object };
  return WithRendererComponent;
};

export default withRenderer;
