import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';
import { defaultTheme } from '@verdigris/theme';
import { noop } from 'lodash';
import { ThemeProvider } from 'emotion-theming';

const SwitchRoot = styled('div')`
  ${p => p.theme.Switch({ Bar, Handle, Label })(p)}
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
          isChecked={isChecked}
          isDisabled={isDisabled}
          onClick={this.handleClick}
        >
          <Bar>
            <Checkbox
              type="checkbox"
              id={`${id}-checkbox`}
              value={Boolean(isChecked)}
              disabled={isDisabled}
            />
            <Handle />
          </Bar>
          {label && (
            <Label>{label}</Label>
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
