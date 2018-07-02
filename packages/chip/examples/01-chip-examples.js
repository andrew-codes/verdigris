import React, { Component } from 'react';
import Chip from '../src/index';

const AssetLink = ({ href, oidToken, children }) => (
  <a href={href}>
    {children}
  </a>
);

export default class App extends Component {
  render() {
    return (
      <div>
        <Chip
          label="basic chip"
        />
        <Chip
          color="lightblue"
          label="colored chip"
        />
        <Chip
          inverted
          color="darkblue"
          label="colored chip with inverted text color"
        />
        <Chip
          avatar={<span>i</span>}
          label="avatar chip"
        />
        <Chip
          avatar={<span>i</span>}
          color="lightgreen"
          label="colored avatar chip"
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
    )
  }
}

