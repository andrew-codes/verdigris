import baseTheme from '@andrew-codes/verdigris-base-theme';
import PropTypes from 'prop-types';
import React from 'react';
import {
  applyTheme,
  createComponent,
  utils,
} from '@andrew-codes/verdigris-style-container';
import { noop } from 'lodash';
import { withAnalytics } from '@andrew-codes/verdigris-analytics';

const localTheme = () => ({
  Switch: {
    spacing: 4,
    backgroundColor: 'gray',
    borderColor: 'white',
    color: '#00a9e0',
    disabledColor: 'lightgray',
    textColor: 'black',
  },
});
const barWidth = 48;
const deriveColor = ({ checked, disabled, theme }, defaultColor) => {
  if (disabled) return theme.Switch.disabledColor;
  if (checked) return theme.Switch.color;
  return defaultColor;
};

const SwitchRoot = createComponent(
  ({ theme }) => ({
    alignItems: 'center',
    display: 'inline-flex',
    ...utils.margin(
      `${theme.Switch.spacing}px`,
      `${theme.Switch.spacing * 2}px`,
    ),
  }),
  'div',
  ['data-component', 'onClick'],
);
const Bar = createComponent(
  ({ theme }) => ({
    backgroundColor: theme.Switch.backgroundColor,
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'inline-flex',
    height: '12px',
    marginRight: `${theme.Switch.spacing}px`,
    position: 'relative',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: `${barWidth}px`,
  }),
  'div',
);
const Handle = createComponent(({ checked, disabled, theme }) => {
  const size = theme.typography.baseSize * theme.typography.lineHeight;
  return {
    backgroundColor: deriveColor({ checked, disabled, theme }, 'white'),
    borderRadius: '50%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: deriveColor(
      { checked, disabled, theme },
      theme.Switch.borderColor,
    ),
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    height: `${size}px`,
    left: `-1px`,
    position: 'absolute',
    top: '50%',
    transform: `translateY(-50%) ${
      checked ? `translateX(${barWidth + theme.Switch.spacing - size}px)` : ''
    }`,
    transition:
      'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: `${size}px`,
  };
}, 'div');
const Label = createComponent(
  ({ disabled, theme }) => ({
    color: disabled ? theme.Switch.disabledColor : theme.Switch.textColor,
    fontSize: `${theme.typography.baseSize}px`,
    lineHeight: theme.typography.lineHeight,
    marginLeft: `${theme.Switch.spacing * 2}px`,
  }),
  'span',
);
const Checkbox = createComponent(
  () => ({
    display: 'none',
  }),
  'input',
  ['type', 'value', 'disabled'],
);

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { checked } = this.state;
    if (nextProps.checked !== checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  render() {
    const { disabled, label } = this.props;
    const { checked } = this.state;

    return (
      <SwitchRoot onClick={this.handleClick} data-component="Switch">
        <Bar>
          <Checkbox
            type="checkbox"
            value={Boolean(checked)}
            disabled={disabled}
          />
          <Handle checked={checked} disabled={disabled} />
        </Bar>
        {label && <Label disabled={disabled}>{label}</Label>}
      </SwitchRoot>
    );
  }

  handleClick = evt => {
    const { createAnalyticsEvent, disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    this.toggleState().then(checked => {
      const analyticsEvent = createAnalyticsEvent({
        component: 'Switch',
        event: 'change',
        payload: checked,
      });
      onChange(evt, analyticsEvent, checked);
    });
  };

  toggleState = () =>
    new Promise(resolve => {
      this.setState(
        state => ({ checked: !state.checked }),
        () => {
          const { checked } = this.state;
          resolve(checked);
        },
      );
    });
}
Switch.propTypes = {
  /**
   * Considered toggled on when true
   */
  checked: PropTypes.bool,
  createAnalyticsEvent: PropTypes.func,
  /**
   * Does not respond to onChange events and cannot be toggled.
   */
  disabled: PropTypes.bool,
  /**
   * Text label associated with the Switch
   */
  label: PropTypes.string,
  /**
   * Fired when checked value changes.
   */
  onChange: PropTypes.func,
};
Switch.defaultProps = {
  checked: false,
  disabled: false,
  onChange: noop,
};

export default applyTheme(baseTheme, localTheme)(withAnalytics()(Switch));
export { Switch };
