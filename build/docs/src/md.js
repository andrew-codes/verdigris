import markings from 'react-markings';
import path from 'path';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { CodeBlock, InlineCode } from '@verdigris/code';

const Link = withRouter(({
  children,
  href,
  location: {
    pathname,
  },
}) => <a href={href.match(/^http/) ? href : `${pathname}/${href}`} title="here">{children}</a>);

export default markings.customize({
  renderers: {
    code: props => <InlineCode>{props.literal}</InlineCode>,
    codeBlock: props => <CodeBlock language={props.language}>{props.literal}</CodeBlock>,
    link: Link,
    image: ({ alt, src, title }) => <img alt={alt}
      src={src.replace(/(\.\.?\/)+assets/, '/assets')}
      title={title}
    />,
  },
});
