import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import {
  CloseIcon
} from '../src/index';

const lightBlueIconTheme = {
  colors: {
    icon: 'blue',
  },
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={lightBlueIconTheme}>
        <div>
          <CloseIcon />
        </div>
      </ThemeProvider>
    );
  }
}
