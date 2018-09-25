import React, { Component } from 'react';
import Chip from '../src/index';
import { css } from 'emotion';
import { extendThemeWith } from '@andrew-codes/verdigris-theme';
import { ThemeProvider } from 'emotion-theming';

const AssetLink = ({ href, oidToken, children }) => (
  <a href={href}>
    {children}
  </a>
);

const pinkTheme = {
  Chip: ({ Avatar, Content, Delete }) => () => css`
    background-color: pink;
    color: red;

    a:visited,
    a:link,
    a:active {
      color: red;
    }

    ${Avatar} {
      background-color: pink;
    }
    ${Delete} {
      background-color: red;
      fill: white;
    }
  `,
};

const blueTheme = {
  Chip: ({ Avatar, Content, Delete }) => () => css`
    background-color: lightblue;
    color: blue;

    a:visited,
    a:link,
    a:active {
      color: blue;
    }

    ${Avatar} {
      background-color: lightblue;
    }
    ${Delete} {
      background-color: blue;
      fill: white;
    }
  `,
};

const biggerTheme = {
  typography: {
    baseSize: 24,
    lineHeight: 1.25,
  },
};

export default class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={extendThemeWith(pinkTheme)}>
          <div>
            <h1>Pink Theme</h1>
            <Chip
              id="basic-chip-pink"
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
              id="deletable-chip-pink"
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
        <ThemeProvider theme={extendThemeWith(blueTheme)}>
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
        <ThemeProvider theme={extendThemeWith(biggerTheme)}>
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
              id="deletable-chip-bigger"
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

