import extendThemeWith from './extendThemeWith';

const theme = {
  spacing: {
    unit: 4,
  },
  typography: {
    baseSize: 16,
    lineHeight: 1.5,
  },
  palette: {
    cerulean: '#00a9e0',
    lightGray: 'lightgray',
    gray: 'gray',
    paper: '#fff',
    black: '#000',
  },
};

export default function defaultTheme(parentTheme = {}) {
  return extendThemeWith(parentTheme)(theme);
}
