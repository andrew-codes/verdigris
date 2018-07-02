import { defaultTheme } from '../';
import defaultThemeSrc from '../defaultTheme';

test('a default theme is exported', () => {
    expect(defaultTheme()).toEqual(defaultThemeSrc());
});
