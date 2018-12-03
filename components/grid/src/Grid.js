import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import {
  createComponent,
  styleUtils,
} from '@andrew-codes/verdigris-style-container';

const spacingUnits = [0, 8, 16, 24, 32, 40];

const GridRoot = createComponent(
  ({ alignContent, alignItems, direction, justify, reversed, spacing }) => ({
    alignContent,
    alignItems,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: `${direction}${reversed ? '-reverse' : ''}`,
    flexWrap: 'wrap',
    justify,
    ...styleUtils.margin(-spacing / 2),
    width: `calc(100% + ${spacing}px)`,
    '> *': {
      ...styleUtils.padding(spacing / 2),
    },
  }),
  'div',
  ['data-component', 'data-test'],
);

const Grid = ({ children, ...rest }) => (
  <StyleProvider>
    <GridRoot {...rest} data-component="Grid">
      {children}
    </GridRoot>
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
  /** Reverses the direction when true. */
  reversed: PropTypes.bool,
  /** Spacing between grid item children. */
  spacing: PropTypes.oneOf(spacingUnits),
  /** Defines `flex-wrap`; applied to all screen sizes. */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
};
Grid.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  direction: 'row',
  justify: 'flex-start',
  reversed: false,
  spacing: 8,
  wrap: 'wrap',
};
Grid.themeDefinition = {};
Grid.defaultThemeValues = {};

export default Grid;
