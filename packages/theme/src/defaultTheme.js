
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
};

export default function defaultTheme(parentTheme = internalTheme) {
  return {
    ...internalTheme,
    ...parentTheme,
    colors: {
      ...internalTheme.colors,
      ...parentTheme.colors,
    },
    spacing: {
      ...internalTheme.spacing,
      ...parentTheme.spacing,
    },
  };
}
