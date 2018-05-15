import React from 'react';
import { mount, shallow } from 'enzyme';
import Code from '../Code';

test('a code string without a language is rendered with a generic language formatting', () => {
  expect(shallow(<Code>ls -a</Code>)).toMatchSnapshot();
});

test('component can be configured to render a specific language', () => {
  expect(shallow(<Code language="bash">ls -a</Code>)).toMatchSnapshot();
});

test('optionally render line numbers', () => {
  expect(
    shallow(
      <Code language="bash" shouldShowLineNumbers>
        ls -a
      </Code>,
    ),
  ).toMatchSnapshot();
});
test('optionally start at line numbers at a given number', () => {
  expect(
    shallow(
      <Code language="bash" shouldShowLineNumbers startingLineNumber={10}>
        ls -a
      </Code>,
    ),
  ).toMatchSnapshot();
});

test('defaults to starting line number at 1', () => {
  expect(
    shallow(
      <Code language="bash" shouldShowLineNumbers>
        ls -a
      </Code>,
    ),
  ).toMatchSnapshot();
});

test('can apply a style object to each line', () => {
  expect(
    shallow(<Code lineNumberStyle={{ color: 'blue' }}>ls -a</Code>),
  ).toMatchSnapshot();
});
