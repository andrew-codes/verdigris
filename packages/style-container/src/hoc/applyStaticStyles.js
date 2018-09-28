import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import getComponentDisplayName from '../getComponentDisplayName';
import withRenderer from './withRenderer';

const applyStaticStyles = staticStyles => ComponentToWrap => {
  class CompWithStaticStyles extends PureComponent {
    componentWillMount() {
      const { renderer } = this.props;
      renderer.renderStatic(staticStyles);
    }

    render() {
      const { renderer, ...props } = this.props;
      return <ComponentToWrap {...props} />;
    }
  }

  CompWithStaticStyles.propTypes = {
    renderer: PropTypes.object.isRequired,
    ...ComponentToWrap.propTypes,
  };
  CompWithStaticStyles.displayName = getComponentDisplayName(ComponentToWrap);

  return withRenderer(CompWithStaticStyles);
};

export default applyStaticStyles;
