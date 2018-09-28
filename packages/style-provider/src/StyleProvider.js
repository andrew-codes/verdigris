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
  children: PropTypes.node,
  dev: PropTypes.bool,
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
