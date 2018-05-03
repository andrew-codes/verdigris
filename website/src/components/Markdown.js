import React from 'react';
import * as PropTypes from 'prop-types';

export default function Markdown({ children }) {
  return React.createElement(children, {
    components: {
      code: (props) => <div>{props.children}</div>
    },
  });
}
Markdown.propTypes = {
  children: PropTypes.element,
};
