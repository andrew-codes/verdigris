
import { merge } from 'lodash';

export default function createTheme(theme) {
  return (parentTheme = {}) => merge({}, parentTheme, theme);
}
