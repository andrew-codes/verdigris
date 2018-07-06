import React, { Component } from 'react';
import { InlineCode } from '../src';

export default class App extends Component {
  render() {
    return (
      <div>
        <div id="inline">
          <h4>Inline</h4>
          <InlineCode>ls -a</InlineCode>
        </div>
      </div>
    )
  }
}
