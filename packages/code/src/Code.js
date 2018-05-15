import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import * as PropTypes from 'prop-types';
import { ghcolors } from 'react-syntax-highlighter/styles/prism';
import supportedLanguages from './supportedLanguages';

export default function Code({
  children,
  height,
  language,
  lineNumberStyle,
  shouldShowLineNumbers,
  startingLineNumber,
  style,
}) {
  return (
    <SyntaxHighlighter
      customStyle={{
        height,
      }}
      language={language}
      lineNumberStyle={lineNumberStyle}
      renderer={height ? virtualizedRenderer() : undefined}
      showLineNumbers={shouldShowLineNumbers}
      startingLineNumber={startingLineNumber}
      style={style}
      wrapLines
    >
      {children}
    </SyntaxHighlighter>
  );
}
Code.propTypes = {
  children: PropTypes.string,
  height: PropTypes.string,
  lineNumberStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  language: PropTypes.oneOf(supportedLanguages),
  shouldShowLineNumbers: PropTypes.bool,
  startingLineNumber: PropTypes.number,
  style: PropTypes.object,
};
Code.defaultProps = {
  startingLineNumber: 1,
  style: ghcolors,
};
