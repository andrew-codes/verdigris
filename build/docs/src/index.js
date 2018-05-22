import Code from '@verdigris/code';
import markings from 'react-markings';
import React from 'react';

export const md = markings.customize({
  renderers: {
    codeBlock: props => <Code language={props.language}>{props.literal}</Code>,
  },
});
export { default as code } from './code';
