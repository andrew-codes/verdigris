const defaultTheme = {
  colors: {
    backgroundPrimary: 'lightgray',
    invertedText: 'white',
    text: 'black',
  },
  spacing: {
    unit: 4,
  }
};

export default function getTheme(props) {
  return Object.keys(props.theme).length > 0
    ? props.theme
    : defaultTheme;
}
