import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';
import { defaultTheme } from '@verdigris/theme';
import { noop } from 'lodash';
import { ThemeProvider } from 'emotion-theming';

const SwitchRoot = styled('div')`
  align-items: center;
  display: inline-flex;
  height: ${p => (p.theme.typography.baseSize * p.theme.typography.lineHeight) + 6}px;
  margin: ${p => p.theme.spacing.unit}px ${p => p.theme.spacing.unit * 2}px;
`;
const SwitchBar = styled('div')`
  background: ${p => p.isDisabled ? p.theme.colors.disabled : p.isChecked ? p.theme.colors.highlightAccentSecondary : p.theme.colors.background};
  border-radius: 4px;
  box-shadow: rgba(0,0,0,0.35) 2px 2px;
  cursor: pointer;
  display: inline-flex;
  height: 12px;
  margin-right: 4px;
  position: relative;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 48px;
`;
const Label = styled('span')`
  margin-left: ${p => p.theme.spacing.unit * 2}px;
  color: ${p => p.isDisabled ? p.theme.colors.disabled : p.theme.colors.text}
`;
const Checkbox = styled('input')`
  display: none;
`;
const Handle = styled('div')`
  background: ${p => p.isDisabled ? p.theme.colors.disabled : p.isChecked ? p.theme.colors.highlight : 'white'};
  border-radius: 50%;
  border: 1px solid ${p => p.isDisabled ? p.theme.colors.disabled : p.isChecked ? p.theme.colors.highlightAccentPrimary : p.theme.colors.backgroundAccentPrimary};
  box-shadow: rgba(0,0,0,0.35) 2px 2px;
  height: ${p => p.theme.typography.baseSize * p.theme.typography.lineHeight}px;
  left: 0px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) ${p => p.isChecked ? `translateX(${48 + 4 - (p.theme.typography.baseSize * p.theme.typography.lineHeight)}px)` : ''};
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: ${p => p.theme.typography.baseSize * p.theme.typography.lineHeight}px;
`;

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isChecked !== this.state.isChecked) {
      this.setState({
        isChecked: nextProps.isChecked,
      });
    }
  }

  render() {
    const { id, isDisabled, label, ...rest } = this.props;
    const { isChecked } = this.state;

    return (
      <ThemeProvider theme={defaultTheme}>
        <SwitchRoot
          id={id}
          {...rest}
          onClick={this.handleClick}
        >
          <SwitchBar
            isChecked={isChecked}
            isDisabled={isDisabled}
          >
            <Checkbox type="checkbox" id={`${id}-checkbox`} value={Boolean(isChecked)} disabled={isDisabled} />
            <Handle
              isChecked={isChecked}
              isDisabled={isDisabled}
            />
          </SwitchBar>
          {label && (
            <Label isDisabled={isDisabled}>{label}</Label>
          )}
        </SwitchRoot>
      </ThemeProvider>
    );
  }

  handleClick = evt => {
    if (this.props.isDisabled) {
      return;
    }
    this.toggleState()
      .then(isChecked => this.props.onChange(evt, isChecked));
  }

  toggleState = () => new Promise(resolve => {
    this.setState({ isChecked: !this.state.isChecked }, resolve);
  });
}
Switch.propTypes = {
  /**
   * Unique HTML ID applied to root element.
   */
  id: PropTypes.string,
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
}
export default Switch;
