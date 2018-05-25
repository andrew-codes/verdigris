import markings from 'react-markings';
import React from 'react';
import { CodeBlock, InlineCode } from '@verdigris/code';
import { withRouter } from 'react-router-dom';

const Link = withRouter(({
  children,
  href,
  location: {
    pathname,
  },
}) => <a href={`${pathname}/${href}`} title="here">{children}</a>);

export const md = markings.customize({
  renderers: {
    code: props => <InlineCode>{props.literal}</InlineCode>,
    codeBlock: props => <CodeBlock language={props.language}>{props.literal}</CodeBlock>,
    link: Link,
  },
});
export { default as code } from './code';
