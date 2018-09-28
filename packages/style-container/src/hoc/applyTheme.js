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
  // eslint-disable-next-line react/forbid-prop-types
  ThemedComponent.childContextTypes = { theme: PropTypes.object };
  // eslint-disable-next-line react/forbid-prop-types
  ThemedComponent.contextTypes = { theme: PropTypes.object };

  return ThemedComponent;
};

export default applyTheme;
