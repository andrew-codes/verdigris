import React, { Component } from 'react';
import Chip from '../src/index';

const AssetLink = ({ href, children }) => (
  <a href={href}>
    {children}
  </a>
);

export default class App extends Component {
  render() {
    return (
      <div>
        <Chip
          id="basic-chip"
          label="basic chip"
        />
        <Chip
          avatar={<span>i</span>}
          id="with-avatar"
          label="avatar chip"
        />
        <Chip
          component={AssetLink}
          href="https://google.com"
          id="asset-link"
          label="chip with custom AssetLink component"
        />
        <Chip
          avatar={<span>i</span>}
          clickable
          id="clickable-chip"
          label="a clickable chip"
          onClick={() => console.log('clickable chip clicked')}
        />
        <Chip
          avatar={<span>i</span>}
          clickable
          component="a"
          href="https://google.com"
          id="clickable-link-chip"
          label="a clickable link chip"
          onClick={() => console.log('clickable link chip clicked')}
        />
        <Chip
          avatar={<span>i</span>}
          label="a deletable chip"
          id="deletable-chip"
          onDelete={() => console.log('deletable chip deleted')}
        />
        <Chip
          avatar={<span>i</span>}
          clickable
          id="clickable-deletable-chip"
          label="a clickable, deletable chip"
          onClick={() => console.log('clickable deletable chip clicked')}
          onDelete={() => console.log('clickable deletable chip deleted')}
        />
        <Chip
          id="basic-deletable-chip"
          label="basic deletable chip"
          onDelete={() => console.log('basic chip deleted')}
        />
        <Chip
          fullWidth
          id="full-width"
          label="full width"
        />
      </div>
    )
  }
}

