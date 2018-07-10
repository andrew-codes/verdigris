import React, { Component } from 'react';
import { Switch } from '../src/index';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch
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
          <Switch
            isChecked
            id="with-label-checked"
            label="a label"
          />
        </div>
        <div>
          <Switch
            isDisabled
            id="with-label-disabled"
            label="disabled toggled off"
          />
          <Switch
            isChecked
            isDisabled
            id="with-label-checked-disabled"
            label="disabled toggled on"
          />
        </div>
      </div>
    )
  }
}

