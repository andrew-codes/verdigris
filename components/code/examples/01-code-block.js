import React, { Component } from 'react';
import { CodeBlock } from '../src/index';

const multiLineCode = `ls -a
cd ../`;

export default class App extends Component {
  render() {
    return (
      <div>
        <h4>Without a language</h4>
        <CodeBlock id="without-language">
          ls -a
       </CodeBlock>

        <h4>With a language</h4>
        <CodeBlock id="with-language" language="bash">
          ls -a
        </CodeBlock>

        <h4>With line numbers</h4>
        <CodeBlock
          shouldShowLineNumbers
          id="with-line-numbers"
          language="bash"
        >
          {multiLineCode}
        </CodeBlock>

        <h4>Staring at line N (10)</h4>
        <CodeBlock
          shouldShowLineNumbers
          id="with-starting-line-number"
          language="bash"
          startingLineNumber={10}
        >
          {multiLineCode}
        </CodeBlock>

        <h4>Line number styling</h4>
        <CodeBlock
          shouldShowLineNumbers
          id="line-style-object"
          language="bash"
          lineNumberStyle={{ color: 'blue' }}
        >
          {multiLineCode}
        </CodeBlock>

        <h4>Line number styling via function</h4>
        <CodeBlock
          shouldShowLineNumbers
          id="line-style-function"
          language="bash"
          lineNumberStyle={lineNumber => lineNumber % 2 ? { color: 'blue' } : { color: 'green' }}
        >
          {multiLineCode}
        </CodeBlock>
      </div>
    )
  }
}
