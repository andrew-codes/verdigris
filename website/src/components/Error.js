import React from 'react';
import * as PropTypes from 'prop-types';

export default function Error({ message, stack }) {
  return (
    <blockquote>
      <strong>Error</strong>
      <div>{message}</div>
      <div>{stack}</div>
    </blockquote>
  )
}
Error.propTypes = {
  message: PropTypes.string,
  stack: PropTypes.string,
};
Error.defaultProps = {
  message: 'Unknown Error',
  stack: '',
};
