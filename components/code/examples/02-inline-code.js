import React, { Component } from 'react';
import { InlineCode } from '../src';

export default class App extends Component {
  render() {
    return (
      <div>
        <h4>Inline</h4>
        <InlineCode id="inline">ls -a</InlineCode>
      </div>
    )
  }
}
