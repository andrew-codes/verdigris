import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import * as PropTypes from 'prop-types';
import { ghcolors } from 'react-syntax-highlighter/styles/prism';
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
}) {
  return (
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
  );
}
CodeBlock.propTypes = {
  children: PropTypes.string,
  height: PropTypes.string,
  lineNumberStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  language: PropTypes.oneOf(supportedLanguages),
  shouldShowLineNumbers: PropTypes.bool,
  startingLineNumber: PropTypes.number,
  style: PropTypes.object,
  theme: PropTypes.object,
};
CodeBlock.defaultProps = {
  startingLineNumber: 1,
  style: {},
  theme: ghcolors,
};
