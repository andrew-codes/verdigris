import { mergeWith } from 'lodash';

const customizeMerge = (objValue, srcValue, key) => {
  if (Array.isArray(objValue)) {
    if (!Array.isArray(srcValue)) {
      // eslint-disable-next-line no-console
      console.warn(
        `Cannot merge values for ${key}; one is an array and one is not. Did you mean for both of them to be an array?`,
      );
    }
    return objValue.concat(srcValue);
  }
  return undefined;
};

const createDeriveThemeValue = baseTheme => theme => {
  if (typeof theme === 'function') return theme(baseTheme);
  if (typeof theme === 'object') return theme;

  throw new Error('Theme must be either a function or an object');
};

const mergeThemes = (baseTheme, ...themes) => {
  const deriveThemeValue = createDeriveThemeValue(baseTheme);
  return (themes || []).reduce(
    (acc, theme) => mergeWith(acc, deriveThemeValue(theme), customizeMerge),
    baseTheme,
  );
};

export default mergeThemes;
