import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import getComponentDisplayName from '../getComponentDisplayName';
import withRenderer from './withRenderer';

const applyStaticStyles = (staticStyles, selector) => ComponentToWrap => {
  class CompWithStaticStyles extends PureComponent {
    componentWillMount() {
      const { renderer } = this.props;
      renderer.renderStatic(staticStyles, selector);
    }

    render() {
      const { renderer, ...props } = this.props;
      return <ComponentToWrap {...props} />;
    }
  }

  CompWithStaticStyles.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    renderer: PropTypes.object,
    ...ComponentToWrap.propTypes,
  };
  CompWithStaticStyles.displayName = getComponentDisplayName(ComponentToWrap);

  return withRenderer(CompWithStaticStyles);
};

export default applyStaticStyles;
