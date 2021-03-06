import PropTypes from 'prop-types';
import React from 'react';
import { createComponent } from '@andrew-codes/verdigris-style-container';

const IconRoot = createComponent(
  ({ color }) => ({
    alignContent: 'center',
    fill: color,
    display: 'inline-flex',
    justifyContent: 'center',
  }),
  'span',
  ['data-component'],
);

function SvgIcon({ children, color, size }) {
  return (
    <IconRoot color={color} data-component="SvgIcon">
      {React.cloneElement(React.Children.only(children), {
        style: { width: `${size}px`, height: `${size}px` },
      })}
    </IconRoot>
  );
}
SvgIcon.propTypes = {
  /**
   * SVG icon element
   */
  children: PropTypes.node,
  /**
   * Color of the icon. To inherit color from parent, use "inherit".
   */
  color: PropTypes.string,
  /**
   * Size of the icon.
   */
  size: PropTypes.number,
};
SvgIcon.defaultProps = {
  color: '#000',
  size: 16,
};

export default SvgIcon;
