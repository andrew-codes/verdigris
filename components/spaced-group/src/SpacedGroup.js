import PropTypes from 'prop-types';
import React from 'react';
import WithBreakpoint, {
  breakpointKeys,
  isBreakpointUp,
} from '@andrew-codes/verdigris-with-breakpoint';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import {
  createComponent,
  styleUtils,
} from '@andrew-codes/verdigris-style-container';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

const getBreakpointMargin = (breakpoint, breakpointMarginValues) =>
  breakpointKeys
    .slice(0)
    .reverse()
    .reduce((acc, target) => {
      if (acc) return acc;
      if (isBreakpointUp(target, breakpoint)) {
        return breakpointMarginValues[target];
      }
      return null;
    }, null);

const getCenteredStyles = () => {
  return {
    alignItems: 'center',
  };
};

const SpacedGroupContainer = createComponent(
  ({ centered, breakpoint, direction, xs, sm, md, lg, xl }) => {
    const margin = getBreakpointMargin(breakpoint, { xs, sm, md, lg, xl });
    const centeredStyles = getCenteredStyles(direction);

    return {
      display: 'flex',
      flexDirection: direction === HORIZONTAL ? 'row' : 'column',
      ...styleUtils.conditionalStyles(centered, centeredStyles),
      '> *': {
        ...styleUtils.margin(margin),
      },
      'flex-wrap': 'wrap',
    };
  },
  'div',
  ['data-component'],
);

const SpacedGroup = props => (
  <StyleProvider>
    <WithBreakpoint>
      {breakpoint => (
        <SpacedGroupContainer
          {...props}
          data-component="SpacedGroup"
          breakpoint={breakpoint}
        />
      )}
    </WithBreakpoint>
  </StyleProvider>
);

const spacingUnits = [0, 2, 4, 8, 16, 24, 32, 40];

SpacedGroup.propTypes = {
  /** When true, items are centered (horizontally or vertically, but not both) */
  centered: PropTypes.bool,
  /** Items to apply equal spacing */
  children: PropTypes.node,
  /** Set the direction elements should be rendered */
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /** Amount of space to apply to children when the screen is small desktop and up */
  lg: PropTypes.oneOf(spacingUnits),
  /** Amount of space to apply to children when the screen is tablet landscape and up */
  md: PropTypes.oneOf(spacingUnits),
  /** Amount of space to apply to children when the screen is tablet portrait and up */
  sm: PropTypes.oneOf(spacingUnits),
  /** Amount of space to apply to children when the screen is large desktop and up */
  xl: PropTypes.oneOf(spacingUnits),
  /** Amount of space to apply to children when the screen is phone and up */
  xs: PropTypes.oneOf(spacingUnits),
};

SpacedGroup.defaultProps = {
  centered: false,
  direction: HORIZONTAL,
  xs: 8,
};

export default SpacedGroup;
