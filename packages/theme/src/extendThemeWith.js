
import { merge } from 'lodash';
import { css } from 'emotion';

const components = [
  'Chip',
  'Icon',
  'Switch',
];

export default function extendThemeWith(theme) {
  return (parentTheme = {}) => merge({}, parentTheme, theme, components.reduce((prev, c) => ({
    ...prev,
    [c]: componentParts => props => css`
    ${parentTheme[c] ? parentTheme[c](componentParts)(props) : ''}
    ${theme[c] ? theme[c](componentParts)(props) : ''}
    `,
  }), {}));
}
