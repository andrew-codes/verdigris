import React from 'react';
import CodeMirror from 'codemirror';
import { Playground } from 'docz';
import StyleProvider from '@andrew-codes/verdigris-style-provider';

CodeMirror.defaults.viewportMargin = Infinity;

export default ({ children, testId, ...rest }) => (
  <div data-testid={testId}>
    <StyleProvider>
      <Playground {...rest}>{children}</Playground>
    </StyleProvider>
  </div>
);
