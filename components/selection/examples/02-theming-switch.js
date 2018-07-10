import React, { Component } from 'react';
import { Switch } from '../src/index';
import { ThemeProvider } from 'emotion-theming';
import { css } from 'emotion';
import { extendThemeWith } from '@verdigris/theme';

const iosTheme = {
  Switch: ({ Bar, Handle, Label }) => ({ isChecked, isDisabled, theme }) => css`
    ${Bar} {
      background: ${isDisabled ? 'lightgray' : isChecked ? 'lightgreen' : 'white'};
      box-shadow: none;
      border: 1px solid lightgray;
      height: ${(theme.typography.baseSize * theme.typography.lineHeight) + 4}px;
      border-radius: ${(theme.typography.baseSize * theme.typography.lineHeight / 2) + 2}px;
    }
    ${Handle} {
      background: white;
      border: 1px solid lightgray;
      border-radius: 50%;
      box-shadow: none;
      left: 0;
      transform: translateY(-50%) translateX(${isChecked ? 48 - (16 * 1.5) - 2 : 0}px);
    }
    ${Label} {
      color: ${isDisabled ? 'lightgray' : 'black'};
    }
  `,
};
const blueTheme = {
  Switch: ({ Bar, Handle, Label }) => ({ isChecked, isDisabled }) => css`
    ${Bar} {
      background: ${isChecked ? 'lightblue' : 'white'};
    }
    ${Handle} {
      background: white;
    }
    ${Label} {
      color: black;
    }
  `,
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={extendThemeWith(iosTheme)}>
        <div>
          <div>
            <h4>iOS style</h4>
            <Switch
              isChecked
              id="basic-switch"
            />
          </div>
          <div>
            <Switch
              id="with-label"
              label="a label"
            />
          </div>
          <div>
            <ThemeProvider theme={extendThemeWith(blueTheme)}>
              <Switch
                isChecked
                label="additional blue theme"
              />
            </ThemeProvider>
          </div>
          <div>
            <Switch
              isDisabled
              label="disabled toggled off"
            />
            <Switch
              isChecked
              isDisabled
              label="disabled toggled on"
            />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

