import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';
import WithBreakpoint, {
  getBreakpointValue,
} from '../../with-breakpoint/src/index';

const gridSizes = ['auto', false, true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getGridSizeStyles = (breakpoint, breakpointValues) => {
  if (breakpoint === true) {
    return {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: '100%',
    };
  }
  if (breakpoint === 'auto') {
    return {
      flexBasis: 'auto',
      flexGrow: 0,
      maxWidth: 'none',
    };
  }

  const size = getBreakpointValue(breakpoint, breakpointValues);
  const width = `${Math.round((size / 12) * 10e7) / 10e5}%`;
  return {
    flexBasis: width,
    flexGrow: 0,
    maxWidth: width,
  };
};

const GridItemRoot = createComponent(
  ({
    alignContent,
    alignItems,
    breakpoint,
    direction,
    justify,
    reversed,
    xs,
    sm,
    md,
    lg,
    xl,
  }) => {
    return {
      ...getGridSizeStyles(breakpoint, { xs, sm, md, lg, xl }),
      alignContent,
      alignItems,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: `${direction}${reversed ? '-reverse' : ''}`,
      justify,
      margin: '0',
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const Grid = ({ children, ...rest }) => (
  <StyleProvider>
    <WithBreakpoint>
      {breakpoint => (
        <GridItemRoot
          {...rest}
          breakpoint={breakpoint}
          data-component="GridItem"
        >
          {children}
        </GridItemRoot>
      )}
    </WithBreakpoint>
  </StyleProvider>
);
Grid.propTypes = {
  /** Defines the `align-content` style property; applied to all screen sizes. */
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  /** Defines the `align-items` style property; applied to all screen sizes. */
  alignItems: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
  ]),
  children: PropTypes.node,
  /** Apply a `row` or `column` flex-direction orientation. */
  direction: PropTypes.oneOf(['row', 'column']),
  /**
   * Defines the `justify-content` style property; applied to all screen sizes.
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  /** The number of grids to be used; applied to `lg` breakpoint and up. */
  lg: PropTypes.oneOf(gridSizes),
  /** The number of grids to be used; applied to `md` breakpoint and up. */
  md: PropTypes.oneOf(gridSizes),
  /** Reverses the direction when true. */
  reversed: PropTypes.bool,
  /** The number of grids to be used; applied to `sm` breakpoint and up. */
  sm: PropTypes.oneOf(gridSizes),
  /** Defines `flex-wrap`; applied to all screen sizes. */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /** The number of grids to be used; applied to `xl` breakpoint and up. */
  xl: PropTypes.oneOf(gridSizes),
  /** The number of grids to be used; applied to all the screen sizes with the lowest priority. */
  xs: PropTypes.oneOf(gridSizes),
};
Grid.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  justify: 'flex-start',
  wrap: 'wrap',
  xs: false,
};
Grid.themeDefinition = {};
Grid.defaultThemeValues = {};

export default Grid;
