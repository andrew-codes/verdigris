
import React from 'react';
import { withTheme } from 'emotion-theming';

function ThemedIcon({ children, size, }) {
  return React.cloneElement(children, { style: { width: `${size}px`, height: `${size}px` } });
}
export default withTheme(ThemedIcon);
