import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { css } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { defaultTheme } from '@verdigris/theme';
import ThemedIcon from './private-utils/ThemedIcon';

const localTheme = () => ({ theme }) => css`
  align-content: center;
  display: inline-flex;
  fill: ${theme.palette.black};
  justify-content: center;
`;
const IconRoot = styled('span')`
  ${p => localTheme()(p)} ${p => p.theme.Icon()(p)};
`;

function SvgIcon({ children, size }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <IconRoot>
        <ThemedIcon size={size}>{children}</ThemedIcon>
      </IconRoot>
    </ThemeProvider>
  );
}
SvgIcon.propTypes = {
  /**
   * SVG icon element
   */
  children: PropTypes.node,
  /**
   * Size of the icon.
   */
  size: PropTypes.number,
};
SvgIcon.defaultProps = {
  size: 16,
};

export default SvgIcon;
