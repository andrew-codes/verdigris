import { merge } from 'lodash';

const theme = {
  colors: {
    background: 'lightgray',
    backgroundAccentPrimary: 'gray',
    backgroundDark: 'gray',
    backgroundLight: '#fff',
    backgroundAccentSecondary: '#fff',
    icon: '#000',
    text: '#000',
    disabled: 'lightgray',
    textInvert: 'lightgray',
    highlight: 'lightblue',
    highlightAccentPrimary: 'blue',
    highlightAccentSecondary: 'lightgreen',
  },
  spacing: {
    unit: 4,
  },
  typography: {
    baseSize: 16,
    lineHeight: 1.5,
  },
};

export default function defaultTheme(parentTheme = {}) {
  return merge({}, theme, parentTheme);
}
