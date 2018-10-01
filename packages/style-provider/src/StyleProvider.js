import PropTypes from 'prop-types';
import React, {
  Children,
  Component,
  isValidElement,
  cloneElement,
} from 'react';
import { Provider } from 'react-fela';
import createRenderer from './createRenderer';

let singletonRenderer;
const getRenderer = ({ dev, renderer }) => {
  if (renderer) {
    return renderer;
  }
  if (!singletonRenderer) {
    singletonRenderer = createRenderer({ dev });
  }
  return singletonRenderer;
};
class StyleProvider extends Component {
  getChildContext() {
    return {
      theme: {},
    };
  }

  render() {
    const { dev, children, renderer, ...rest } = this.props;
    const providerRenderer = getRenderer({ dev, renderer });
    const child = Children.only(children);

    return (
      <Provider renderer={providerRenderer}>
        {isValidElement(child) ? cloneElement(child, { ...rest }) : child}
      </Provider>
    );
  }
}
StyleProvider.propTypes = {
  /**
   * A single, valid, renderable node.
   */
  children: PropTypes.node,
  /**
   * Enables development friendly CSS classNames when true.
   */
  dev: PropTypes.bool,
  /**
   * Typically only used for testing purposes; provide your own, external renderer.
   */
  // eslint-disable-next-line react/forbid-prop-types
  renderer: PropTypes.object,
};
StyleProvider.defaultProps = {
  dev: false,
};
StyleProvider.childContextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
};

export default StyleProvider;
