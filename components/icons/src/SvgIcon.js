import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { ThemeProvider } from 'emotion-theming';
import { defaultTheme } from '@verdigris/theme';
import ThemedIcon from './private-utils/ThemedIcon';

const IconRoot = styled('span')`
  align-content: center;
  display: inline-flex;
  fill: ${p => p.theme.colors.icon};
  justify-content: center;
`;

function SvgIcon({ children, size }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <IconRoot>
        <ThemedIcon size={size}>
          {children}
        </ThemedIcon>
      </IconRoot>
    </ThemeProvider>
  );
}
SvgIcon.propTypes = {
  /**
   * Size of the icon.
   */
  size: PropTypes.number,
};
SvgIcon.defaultProps = {
  size: 16,
}

export default SvgIcon;