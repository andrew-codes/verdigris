import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import {
  createComponent,
  styleUtils,
} from '@andrew-codes/verdigris-style-container';
import { noop } from 'lodash';
import { WithAnalytics } from '@andrew-codes/verdigris-analytics';

const deriveColor = ({ checked, disabled, theme }, defaultColor) => {
  if (disabled) return theme.Switch.disabledColor;
  if (checked) return theme.Switch.checkedColor;
  return defaultColor;
};

const SwitchRoot = createComponent(
  ({ theme }) => ({
    alignItems: 'center',
    display: 'inline-flex',
    ...styleUtils.margin(
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
    width: `${theme.Switch.width}px`,
  }),
  'div',
);
const Handle = createComponent(({ checked, disabled, theme }) => {
  const size = theme.Switch.fontSize * theme.Switch.lineHeight;
  return {
    backgroundColor: deriveColor(
      { checked, disabled, theme },
      theme.Switch.color,
    ),
    borderRadius: '50%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: deriveColor({ checked, disabled, theme }, theme.Switch.color),
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    height: `${size}px`,
    left: `-1px`,
    position: 'absolute',
    top: '50%',
    transform: `translateY(-50%) ${
      checked
        ? `translateX(${theme.Switch.width + theme.Switch.spacing - size}px)`
        : ''
    }`,
    transition:
      'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: `${size}px`,
  };
}, 'div');
const Label = createComponent(
  ({ disabled, theme }) => ({
    color: disabled ? theme.Switch.disabledColor : theme.Switch.textColor,
    fontSize: `${theme.Switch.fontSize}px`,
    lineHeight: theme.Switch.lineHeight,
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
      <StyleProvider theme={{ Switch: Switch.defaultThemeValues }}>
        <WithAnalytics>
          {createAnalyticsEvent => (
            <SwitchRoot
              onClick={this.handleClick(createAnalyticsEvent)}
              data-component="Switch"
            >
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
          )}
        </WithAnalytics>
      </StyleProvider>
    );
  }

  handleClick(createAnalyticsEvent) {
    return evt => {
      const { disabled, onChange } = this.props;
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
  }

  toggleState() {
    return new Promise(resolve => {
      this.setState(
        state => ({ checked: !state.checked }),
        () => {
          const { checked } = this.state;
          resolve(checked);
        },
      );
    });
  }
}
Switch.propTypes = {
  /**
   * Considered toggled on when true
   */
  checked: PropTypes.bool,
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
Switch.themeDefinition = {
  /**
   * Color of the bar behind the circular knob.
   */
  backgroundColor: PropTypes.string,
  /**
   * Border of the circular knob when checked.
   */
  checkedColor: PropTypes.string,
  /**
   * Color of the circular knob when neither disabled OR checked.
   */
  color: PropTypes.string,
  /**
   * Color of knob when disabled.
   */
  disabledColor: PropTypes.string,
  /**
   * Size of text; used in size calculations.
   */
  fontSize: PropTypes.number,
  /**
   * Line height of text; used in size calculations.
   */
  lineHeight: PropTypes.number,
  /**
   * Controls spacing unit (padding, margin).
   */
  spacing: PropTypes.number,
  /**
   * Color of the label text.
   */
  textColor: PropTypes.string,
  /**
   * Width of Switch.
   */
  width: PropTypes.number,
};
Switch.defaultThemeValues = {
  backgroundColor: 'gray',
  checkedColor: 'rgb(0, 169, 224)',
  color: 'rgb(255, 255, 255)',
  disabledColor: 'lightgray',
  fontSize: 16,
  lineHeight: 1.5,
  spacing: 4,
  textColor: 'rgb(0, 0, 0)',
  width: 48,
};

export default Switch;
