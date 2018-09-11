import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import App from '@verdigris/website';

export const render = appEl => {
  ReactDOM.render(<App />, appEl);
};
