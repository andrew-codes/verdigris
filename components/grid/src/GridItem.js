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

const GridItemRoot = createComponent(({ breakpoint, xs }) => {
  return {
    ...getGridSizeStyles(breakpoint, { xs }),
    boxSizing: 'border-box',
    margin: '0',
  };
}, 'div');

const Grid = ({ children, ...rest }) => (
  <StyleProvider>
    <WithBreakpoint>
      {breakpoint => (
        <GridItemRoot {...rest} breakpoint={breakpoint}>
          {children}
        </GridItemRoot>
      )}
    </WithBreakpoint>
  </StyleProvider>
);
Grid.propTypes = {
  children: PropTypes.node,
  /** The number of grids to be used; applied for all the screen sizes with the lowest priority. */
  xs: PropTypes.oneOf(gridSizes),
};
Grid.defaultProps = {
  xs: false,
};
Grid.themeDefinition = {};
Grid.defaultThemeValues = {};

export default Grid;
