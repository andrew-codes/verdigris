import React, { Component } from 'react';
import { css } from 'emotion';
import { extendThemeWith } from '@andrew-codes/verdigris-theme';
import { ThemeProvider } from 'emotion-theming';
import {
  CloseIcon
} from '../src/index';

const lightBlueIconTheme = {
  Icon: () => () => css`
    fill: blue;
  `,
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={extendThemeWith(lightBlueIconTheme)}>
        <div>
          <CloseIcon />
        </div>
      </ThemeProvider>
    );
  }
}
