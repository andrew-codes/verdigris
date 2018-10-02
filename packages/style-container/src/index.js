import React from 'react';
import { combineRules } from 'fela';
import { ThemeProvider, connect } from 'react-fela';
import createFelaComponent from './createComponent';
import * as utils from './styleUtils';

export const createComponent = (rule, type = 'div', passThroughProps = []) =>
  createFelaComponent(
    rule,
    type,
    type.propTypes
      ? passThroughProps.concat(Object.keys(type.propTypes))
      : passThroughProps,
  );

export const createComponentStyles = (styleFunctions, component) =>
  connect(styleFunctions)(component);

export { ThemeProvider, connect, combineRules };

export const reduceProps = (props, reduce) =>
  Object.keys(props)
    .map(key => [key, props[key]])
    .reduce((acc, [key, value]) => reduce(acc, key, value), {});

export const filterNone = props =>
  reduceProps(props, (acc, key, value) => {
    if (value == null) return acc;
    acc[key] = value;
    return acc;
  });

export const filterStyle = props =>
  reduceProps(props, (acc, key, value) => {
    if (key === 'style') return acc;
    acc[key] = value;
    return acc;
  });

export const mapChildren = (children, func) =>
  React.Children.toArray(children).map(func);

export { default as getComponentDisplayName } from './getComponentDisplayName';
export { default as withRenderer } from './hoc/withRenderer';
export { default as withTheme } from './hoc/withTheme';
export { default as applyStaticStyles } from './hoc/applyStaticStyles';
export { default as applyTheme } from './hoc/applyTheme';
export { default as applyDefaultTheme } from './hoc/applyDefaultTheme';
export { default as mergeThemes } from './mergeThemes';
export { utils };
