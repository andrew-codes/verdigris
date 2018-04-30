import { Children, Component } from 'react';
import * as PropTypes from 'prop-types';

export default class AnalyticsListener extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onEvent: PropTypes.func.isRequired,
    channel: PropTypes.string,
  }
  static contextTypes = {
    getAnalyticsEventHandlers: PropTypes.func,
  };
  static childContextTypes = {
    getAnalyticsEventHandlers: PropTypes.func.isRequired,
  };

  getChildContext = () => ({
    getAnalyticsEventHandlers: this.getAnalyticsEventHandlers,
  });

  render() {
    return Children.only(this.props.children);
  }

  getAnalyticsEventHandlers = () => {
    const { channel, onEvent } = this.props;
    const { getAnalyticsEventHandlers } = this.context;

    const parentEventHandlers = typeof getAnalyticsEventHandlers === 'function'
      ? getAnalyticsEventHandlers()
      : [];

    const handler = (event, eventChannel) => {
      if (channel === '*' || channel === eventChannel) {
        onEvent(event, eventChannel);
      }
    };
    return [
      handler,
      ...parentEventHandlers,
    ];
  };
}
