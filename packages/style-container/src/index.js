import React from 'react';
import { combineRules } from 'fela';
import { connect } from 'react-fela';
import createFelaComponent from './createComponent';
import * as utils from './styleUtils';

const createComponent = (rule, type = 'div', passThroughProps = []) =>
  createFelaComponent(
    rule,
    type,
    type.propTypes
      ? passThroughProps.concat(Object.keys(type.propTypes))
      : passThroughProps,
  );

const createComponentStyles = (styleFunctions, component) =>
  connect(styleFunctions)(component);

const reduceProps = (props, reduce) =>
  Object.keys(props)
    .map(key => [key, props[key]])
    .reduce((acc, [key, value]) => reduce(acc, key, value), {});

const filterNoneProps = props =>
  reduceProps(props, (acc, key, value) => {
    if (value == null) return acc;
    acc[key] = value;
    return acc;
  });

const filterStyleProps = props =>
  reduceProps(props, (acc, key, value) => {
    if (key === 'style') return acc;
    acc[key] = value;
    return acc;
  });

const mapChildren = (children, func) =>
  React.Children.toArray(children).map(func);

export { default as applyDefaultTheme } from './hoc/applyDefaultTheme';
export { default as applyStaticStyles } from './hoc/applyStaticStyles';
export { default as applyTheme } from './hoc/applyTheme';
export { default as getComponentDisplayName } from './getComponentDisplayName';
export { default as mergeThemes } from './mergeThemes';
export { default as ThemeProvider } from './ThemeProvider';
export { default as withRenderer } from './hoc/withRenderer';
export { default as withTheme } from './hoc/withTheme';
export {
  connect,
  combineRules,
  createComponent,
  createComponentStyles,
  filterNoneProps,
  filterStyleProps,
  mapChildren,
  reduceProps,
  utils,
};
