import React from 'react';
import stringRaw from 'string-raw';
import Code from '@verdigris/code';

export default function code(sources, ...substitutions) {
  const source = stringRaw(sources, substitutions).replace(/^(\s*\n)+/g, '').replace(/(\n\s*)+$/g, '');

  return (
    <Code language="javascript">
      {source}
    </Code>
  );
}
