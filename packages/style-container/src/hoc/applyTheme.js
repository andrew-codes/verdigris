import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getComponentDisplayName from '../getComponentDisplayName';
import mergeThemes from '../mergeThemes';

const applyTheme = (...themes) => ComponentToWrap => {
  class ThemedComponent extends Component {
    getChildContext() {
      const { theme = {} } = this.context;
      return {
        theme: mergeThemes(theme, ...themes),
      };
    }

    render() {
      return <ComponentToWrap {...this.props} />;
    }
  }

  ThemedComponent.displayName = `Themed${getComponentDisplayName(
    ComponentToWrap,
  )}`;
  ThemedComponent.propTypes = ComponentToWrap.propTypes;
  ThemedComponent.childContextTypes = { theme: PropTypes.object };
  ThemedComponent.contextTypes = { theme: PropTypes.object };

  return ThemedComponent;
};

export default applyTheme;
