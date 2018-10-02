import React from 'react';
import CodeMirror from 'codemirror';
import { Playground } from 'docz';

CodeMirror.defaults.viewportMargin = Infinity;

export default ({ children, testId, ...rest }) => (
  <div data-testid={testId}>
    <Playground {...rest}>
      <div>{children}</div>
    </Playground>
  </div>
);
