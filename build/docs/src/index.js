import { CodeBlock, InlineCode } from '@verdigris/code';
import markings from 'react-markings';
import React from 'react';

export const md = markings.customize({
  renderers: {
    codeBlock: props => <CodeBlock language={props.language}>{props.literal}</CodeBlock>,
    code: props => <InlineCode>{props.literal}</InlineCode>
  },
});
export { default as code } from './code';
