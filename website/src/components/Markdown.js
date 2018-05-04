import React from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';

export default function Markdown({ children }) {
  return React.createElement(children, {
    components: {
      code: props => <div>{props.children}</div>,
      a: props => {
        if (/http(s)?:\/\//.exec(props.href)) {
          return <a {...props}>{props.children}</a>;
        }
        return <Link to={props.href} {...props} />;
      },
    },
  });
}
Markdown.propTypes = {
  children: PropTypes.element,
};
