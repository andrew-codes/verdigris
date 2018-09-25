import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import { defaultTheme } from '@andrew-codes/verdigris-theme';
import { noop } from 'lodash';
import { ThemeProvider } from 'emotion-theming';

const deriveColor = (props, defaultColor) => {
  const { isChecked, isDisabled, theme } = props;
  if (isDisabled) return theme.palette.lightGray;
  if (isChecked) return theme.palette.cerulean;
  return defaultColor;
};
const localTheme = ({ Bar, Handle, Label }) => ({
  isChecked,
  isDisabled,
  theme,
}) => css`
  align-items: center;
  display: inline-flex;
  margin: ${theme.spacing.unit}px ${theme.spacing.unit * 2}px;

  ${Bar} {
    background-color: ${theme.palette.gray};
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    height: 12px;
    margin-right: 4px;
    min-width: 48px;
    position: relative;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 48px;
  }
  ${Handle} {
    background: ${deriveColor({ isChecked, isDisabled, theme }, 'white')};
    border-radius: 50%;
    border: 1px solid
      ${deriveColor({ isChecked, isDisabled, theme }, theme.palette.gray)};
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    height: ${theme.typography.baseSize * theme.typography.lineHeight}px;
    left: -1px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%)
      ${isChecked
        ? `translateX(${48 +
            4 -
            theme.typography.baseSize * theme.typography.lineHeight}px)`
        : ''};
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: ${theme.typography.baseSize * theme.typography.lineHeight}px;
  }
  ${Label} {
    color: ${isDisabled ? theme.palette.lightGray : theme.palette.black};
    font-size: ${theme.typography.baseSize}px;
    line-height: ${theme.typography.lineHeight};
    margin-left: ${theme.spacing.unit * 2}px;
  }
`;

const SwitchRoot = styled('div')`
  ${p => localTheme({ Bar, Handle, Label })(p)};
  ${p => p.theme.Switch({ Bar, Handle, Label })(p)};
`;
const Bar = styled('div')``;
const Label = styled('span')``;
const Handle = styled('div')``;
const Checkbox = styled('input')`
  display: none;
`;

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isChecked } = this.state;
    if (nextProps.isChecked !== isChecked) {
      this.setState({
        isChecked: nextProps.isChecked,
      });
    }
  }

  render() {
    const { isDisabled, label, ...rest } = this.props;
    const { isChecked } = this.state;

    return (
      <ThemeProvider theme={defaultTheme}>
        <SwitchRoot
          {...rest}
          isChecked={isChecked}
          isDisabled={isDisabled}
          onClick={this.handleClick}
          data-component="Switch"
        >
          <Bar>
            <Checkbox
              type="checkbox"
              value={Boolean(isChecked)}
              disabled={isDisabled}
            />
            <Handle />
          </Bar>
          {label && <Label>{label}</Label>}
        </SwitchRoot>
      </ThemeProvider>
    );
  }

  handleClick = evt => {
    const { createAnalyticsEvent, isDisabled, onChange } = this.props;
    if (isDisabled) {
      return;
    }
    this.toggleState().then(isChecked => {
      const analyticsEvent = createAnalyticsEvent({
        component: 'Switch',
        event: 'change',
        payload: isChecked,
      });
      onChange(evt, analyticsEvent, isChecked);
    });
  };

  toggleState = () =>
    new Promise(resolve => {
      this.setState(
        state => ({ isChecked: !state.isChecked }),
        () => {
          const { isChecked } = this.state;
          resolve(isChecked);
        },
      );
    });
}
Switch.propTypes = {
  /**
   * Considered toggled on when true
   */
  isChecked: PropTypes.bool,
  /**
   * Does not respond to onChange events and cannot be toggled.
   */
  isDisabled: PropTypes.bool,
  /**
   * Text label associated with the Switch
   */
  label: PropTypes.string,
  /**
   * Fired when Switch isChecked is changed.
   */
  onChange: PropTypes.func,
};
Switch.defaultProps = {
  isChecked: false,
  isDisabled: false,
  onChange: noop,
};
export default Switch;
