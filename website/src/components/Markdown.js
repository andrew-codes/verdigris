import React from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import Code from '@verdigris/code';

export default function Markdown({ children }) {
  return React.createElement(children, {
    components: {
      a: props => {
        if (/http(s)?:\/\//.exec(props.href)) {
          return <a {...props}>{props.children}</a>;
        }
        return <Link to={props.href} {...props} />;
      },
      code: props => {
        const language = props.className[0]
          ? props.className[0].replace('language-', '')
          : undefined;
        return <Code language={language}>{props.children}</Code>;
      },
      // inlineCode: props => <Code>{props.children}</Code>,
    },
  });
}
Markdown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
