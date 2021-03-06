import PropTypes from 'prop-types';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import supportedLanguages from './supportedLanguages';

export default function CodeBlock({
  children,
  height,
  language,
  lineNumberStyle,
  shouldShowLineNumbers,
  startingLineNumber,
  style,
  theme,
  ...rest
}) {
  return (
    <div {...rest} data-component="CodeBlock">
      <SyntaxHighlighter
        customStyle={{
          ...style,
          height,
        }}
        language={language}
        lineNumberStyle={lineNumberStyle}
        renderer={height ? virtualizedRenderer() : undefined}
        showLineNumbers={shouldShowLineNumbers}
        startingLineNumber={startingLineNumber}
        style={theme}
        wrapLines
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
CodeBlock.propTypes = {
  /**
   * code snippet string
   */
  children: PropTypes.string.isRequired,
  /**
   * code block height; will virtualize code block when code scrolls beyond height prop
   */
  height: PropTypes.string,
  /**
   * language of code snippet; must be a supported language
   */
  language: PropTypes.oneOf(supportedLanguages).isRequired,
  /**
   * used to apply styles to each individual line; function accepts `lineNumber` as parameter
   */
  lineNumberStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * displays line numbers when true
   */
  shouldShowLineNumbers: PropTypes.bool,
  /**
   * line number to start on within code block
   */
  startingLineNumber: PropTypes.number,
  /**
   * override styles applied to the `<pre />` tag root element
   */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  /**
   * `react-syntax-highlighter/styles/hljs` theme that provides styling to code
   */
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
};
CodeBlock.defaultProps = {
  height: null,
  lineNumberStyle: null,
  shouldShowLineNumbers: false,
  startingLineNumber: 1,
  style: {},
  theme: docco,
};
