import CodeMirror from 'codemirror';
import React from 'react';
import { Playground } from 'docz';

CodeMirror.defaults.viewportMargin = Infinity;

export default ({ 'data-test': testId, ...rest }) => {
  return (
    <div data-test={testId}>
      <Playground {...rest} />
    </div>
  );
};
