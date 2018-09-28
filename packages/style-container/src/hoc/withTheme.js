import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getComponentDisplayName from '../getComponentDisplayName';

const withTheme = ComponentToWrap => {
  class WithThemeComponent extends Component {
    render() {
      const { theme } = this.context;

      return <ComponentToWrap theme={theme} {...this.props} />;
    }
  }
  WithThemeComponent.displayName = `WithTheme${getComponentDisplayName(
    ComponentToWrap,
  )}`;
  WithThemeComponent.propTypes = ComponentToWrap.propTypes;
  // eslint-disable-next-line react/forbid-prop-types
  WithThemeComponent.contextTypes = { theme: PropTypes.object };

  return WithThemeComponent;
};

export default withTheme;
