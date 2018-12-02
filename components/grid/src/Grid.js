import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@andrew-codes/verdigris-style-provider';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const spacingUnits = [0, 8, 16, 24, 32, 40];

const GridRoot = createComponent(
  () => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  }),
  'div',
);

const Grid = ({ children, spacing, ...rest }) => (
  <StyleProvider>
    <GridRoot {...rest}>{children}</GridRoot>
  </StyleProvider>
);
Grid.propTypes = {
  children: PropTypes.node,
  /** Spacing between grid item children */
  spacing: PropTypes.oneOf(spacingUnits),
};
Grid.defaultProps = {
  spacing: 8,
};
Grid.themeDefinition = {};
Grid.defaultThemeValues = {};

export default Grid;
