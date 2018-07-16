
import { merge } from 'lodash';
import { css } from 'emotion';
import supportedComponents from './supportedComponents';

export default function extendThemeWith(theme) {
  return (parentTheme = {}) => merge({}, parentTheme, theme, supportedComponents.reduce((prev, c) => ({
    ...prev,
    [c]: componentParts => props => css`
    ${parentTheme[c] ? parentTheme[c](componentParts)(props) : ''}
    ${theme[c] ? theme[c](componentParts)(props) : ''}
    `,
  }), {}));
}
