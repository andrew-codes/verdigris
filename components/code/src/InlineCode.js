import React from 'react';
import PropTypes from 'prop-types';
import {
  createComponent,
  utils,
} from '@andrew-codes/verdigris-style-container';

export default function InlineCode({ children, ...rest }) {
  const Code = createComponent(
    () => ({
      backgroundColor: 'rgba(27, 31, 35, 0.05)',
      borderRadius: '3px',
      boxSizing: 'border-box',
      fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
      fontSize: '85%',
      margin: '0',
      ...utils.padding('0.2em', '0.4em'),
    }),
    'code',
    ['data-component', ...Object.keys(rest)],
  );
  return (
    <Code {...rest} data-component="InlineCode">
      {children}
    </Code>
  );
}
InlineCode.propTypes = {
  /**
   * code snippet string
   */
  children: PropTypes.string.isRequired,
};
