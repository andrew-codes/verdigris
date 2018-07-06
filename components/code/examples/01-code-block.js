import React, { Component } from 'react';
import { CodeBlock } from '../src/index';

const multiLineCode = `ls -a
cd ../`;

export default class App extends Component {
  render() {
    return (
      <div>
        <div id="without-language">
          <h4>Without a language</h4>
          <CodeBlock>
            ls -a
            </CodeBlock>
        </div>
        <div id="with-language">
          <h4>With a language</h4>
          <CodeBlock language="bash">
            ls -a
          </CodeBlock>
        </div>
        <div id="with-line-numbers">
          <h4>With line numbers</h4>
          <CodeBlock shouldShowLineNumbers language="bash">
            {multiLineCode}
          </CodeBlock>
        </div>
        <div id="with-starting-line-number">
          <h4>Staring at line N (10)</h4>
          <CodeBlock shouldShowLineNumbers language="bash" startingLineNumber={10}>
            {multiLineCode}
          </CodeBlock>
        </div>
        <div id="line-style-object">
          <h4>Line number styling</h4>
          <CodeBlock shouldShowLineNumbers language="bash" lineNumberStyle={{ color: 'blue' }}>
            {multiLineCode}
          </CodeBlock>
        </div>
        <div id="line-style-function">
          <h4>Line number styling via function</h4>
          <CodeBlock shouldShowLineNumbers language="bash" lineNumberStyle={lineNumber => lineNumber % 2 ? { color: 'blue' } : { color: 'green' }}>
            {multiLineCode}
          </CodeBlock>
        </div>
      </div>
    )
  }
}
