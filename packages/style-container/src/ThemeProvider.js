import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import mergeThemes from './mergeThemes';

class ThemeProvider extends Component {
  getChildContext() {
    const { theme = {} } = this.context;
    const { theme: propsTheme } = this.props;
    return {
      theme: mergeThemes(theme, propsTheme),
    };
  }

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}
ThemeProvider.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};
ThemeProvider.childContextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
};
ThemeProvider.contextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
};

export default ThemeProvider;
