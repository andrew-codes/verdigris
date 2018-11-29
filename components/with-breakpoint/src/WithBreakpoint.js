import debounce from 'debounce';
import EventListener from 'react-event-listener';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { WithTheme } from '@andrew-codes/verdigris-style-container';
import { keys as breakpointKeys } from './breakpoints';

const isSSR = () => typeof window === 'undefined';

class WithBreakpoint extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      breakpoints: {
        values: {},
      },
    };
    this.state = {
      breakpoint: isSSR() ? undefined : this.getBreakpoint(),
    };

    if (!isSSR()) {
      const { resizeInterval } = this.props;

      this.handleResize = debounce(() => {
        this.setBreakpoint();
      }, resizeInterval);
    }
  }

  componentDidMount() {
    this.setBreakpoint();
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  render() {
    const { children } = this.props;
    const { breakpoint } = this.state;
    return (
      <StyleProvider theme={WithBreakpoint.defaultThemeValues}>
        <WithTheme>
          {theme => {
            this.theme = theme;
            return (
              <Fragment>
                {children(breakpoint)}
                <EventListener target="window" onResize={this.handleResize} />
              </Fragment>
            );
          }}
        </WithTheme>
      </StyleProvider>
    );
  }

  getBreakpoint(innerWidth = window.innerWidth) {
    const {
      breakpoints: { values },
    } = this.theme;

    return (
      breakpointKeys.reduce((acc, breakpoint, index) => {
        if (acc) return acc;
        if (innerWidth < values[breakpoint]) {
          return breakpointKeys[index - 1];
        }
      }, null) || 'xl'
    );
  }

  setBreakpoint() {
    const { breakpoint } = this.state;
    const newBreakpoint = this.getBreakpoint();
    if (newBreakpoint !== breakpoint) {
      this.setState({
        breakpoint: newBreakpoint,
      });
    }
  }
}
WithBreakpoint.propTypes = {
  /** Render prop function accepting the breakpoint as its only parameter */
  children: PropTypes.func.isRequired,
  /** Interval to re-calculate viewport width; default is 10 frames at 60Hz */
  resizeInterval: PropTypes.number,
};
WithBreakpoint.defaultProps = {
  resizeInterval: 166,
};
WithBreakpoint.themeDefinition = {
  breakpoints: PropTypes.shape({
    values: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number,
    }),
  }),
};
WithBreakpoint.defaultThemeValues = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export default WithBreakpoint;
