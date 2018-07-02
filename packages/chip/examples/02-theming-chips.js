import React, { Component } from 'react';
import Chip from '../src/index';
import { ThemeProvider } from 'emotion-theming';

const AssetLink = ({ href, oidToken, children }) => (
  <a href={href}>
    {children}
  </a>
);

const pinkTheme = {
  colors: {
    background: 'pink',
    backgroundDark: 'red',
    text: 'red',
    textInvert: 'white',
  },
};
const blueTheme = {
  colors: {
    background: 'blue',
    backgroundDark: 'navy',
    text: 'lightblue',
    textInvert: 'white',
  },
};
const biggerTheme = {
  typography: {
    baseSize: 24,
    lineHeight: 1.5,
  },
};

export default class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={pinkTheme}>
          <div>
            <h1>Pink Theme</h1>
            <Chip
              label="basic chip"
            />
            <Chip
              avatar={<span>i</span>}
              label="avatar chip"
            />
            <Chip
              component={AssetLink}
              href="https://google.com"
              label="chip with custom component"
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              label="a clickable chip"
              onClick={() => alert('clickable chip was clicked')}
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              component="a"
              href="https://google.com"
              label="a clickable link chip"
              onClick={() => alert('clickable link chip was clicked')}
            />
            <Chip
              avatar={<span>i</span>}
              label="a deletable chip"
              onDelete={() => alert('deletable chip deleted')}
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              label="a clickable, deletable chip"
              onClick={() => alert('clickable deleteable chip was clicked')}
              onDelete={() => alert('deletable chip deleted')}
            />
            <Chip
              label="basic deletable chip"
              onDelete={() => alert('basic chip deleted')}
            />
          </div>
        </ThemeProvider>
        <hr />
        <ThemeProvider theme={blueTheme}>
          <div>
            <h1>Blue Theme</h1>
            <Chip
              label="basic chip"
            />
            <Chip
              avatar={<span>i</span>}
              label="avatar chip"
            />
            <Chip
              component={AssetLink}
              href="https://google.com"
              label="chip with custom component"
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              label="a clickable chip"
              onClick={() => alert('clickable chip was clicked')}
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              component="a"
              href="https://google.com"
              label="a clickable link chip"
              onClick={() => alert('clickable link chip was clicked')}
            />
            <Chip
              avatar={<span>i</span>}
              label="a deletable chip"
              onDelete={() => alert('deletable chip deleted')}
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              label="a clickable, deletable chip"
              onClick={() => alert('clickable deleteable chip was clicked')}
              onDelete={() => alert('deletable chip deleted')}
            />
            <Chip
              label="basic deletable chip"
              onDelete={() => alert('basic chip deleted')}
            />
          </div>
        </ThemeProvider>
        <hr />
        <ThemeProvider theme={biggerTheme}>
          <div>
            <h1>Bigger Theme</h1>
            <Chip
              label="basic chip"
            />
            <Chip
              avatar={<span>i</span>}
              label="avatar chip"
            />
            <Chip
              component={AssetLink}
              href="https://google.com"
              label="chip with custom component"
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              label="a clickable chip"
              onClick={() => alert('clickable chip was clicked')}
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              component="a"
              href="https://google.com"
              label="a clickable link chip"
              onClick={() => alert('clickable link chip was clicked')}
            />
            <Chip
              avatar={<span>i</span>}
              label="a deletable chip"
              onDelete={() => alert('deletable chip deleted')}
            />
            <Chip
              avatar={<span>i</span>}
              clickable
              label="a clickable, deletable chip"
              onClick={() => alert('clickable deleteable chip was clicked')}
              onDelete={() => alert('deletable chip deleted')}
            />
            <Chip
              label="basic deletable chip"
              onDelete={() => alert('basic chip deleted')}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

