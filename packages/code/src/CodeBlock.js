import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import { ghcolors } from 'react-syntax-highlighter/styles/prism';
import * as PropTypes from 'prop-types';
import supportedLanguages from './supportedLanguages';

ghcolors["pre[class*=\"language-\"]"].backgroundColor = 'rgba(27,31,35,0.05)';

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
  children: PropTypes.string.isRequired,
  height: PropTypes.string,
  language: PropTypes.oneOf(supportedLanguages).isRequired,
  lineNumberStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  shouldShowLineNumbers: PropTypes.bool,
  startingLineNumber: PropTypes.number,
  style: PropTypes.object,
  theme: PropTypes.object,
};
CodeBlock.defaultProps = {
  height: null,
  lineNumberStyle: null,
  shouldShowLineNumbers: false,
  startingLineNumber: 1,
  style: {},
  theme: ghcolors,
};
