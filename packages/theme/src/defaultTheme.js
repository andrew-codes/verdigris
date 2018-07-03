
import { merge } from 'lodash';

const internalTheme = {
  colors: {
    background: 'lightgray',
    backgroundDark: 'gray',
    backgroundLight: '#fff',
    text: '#000',
    textInvert: 'lightgray',
  },
  spacing: {
    unit: 4,
  },
  typography: {
    baseSize: 16,
    lineHeight: 1.5,
  },
};

export default function defaultTheme(parentTheme = internalTheme) {
  return merge(internalTheme, parentTheme);
}
