import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import * as PropTypes from 'prop-types';
import supportedLanguages from './supportedLanguages';

export default function Code({
  children,
  language,
  lineNumberStyle,
  shouldShowLineNumbers,
  startingLineNumber,
}) {
  return (
    <SyntaxHighlighter
      language={language}
      lineNumberStyle={lineNumberStyle}
      renderer={virtualizedRenderer()}
      showLineNumbers={shouldShowLineNumbers}
      startingLineNumber={startingLineNumber}
      wrapLines
    >
      {children}
    </SyntaxHighlighter>
  );
}
Code.propTypes = {
  children: PropTypes.string,
  lineNumberStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  language: PropTypes.oneOf(supportedLanguages),
  shouldShowLineNumbers: PropTypes.bool,
  startingLineNumber: PropTypes.number,
};
Code.defaultProps = {
  lineNumberStyle: {},
  startingLineNumber: 1,
};
