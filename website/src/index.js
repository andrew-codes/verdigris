import React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './containers/App';
import { GOOGLE_ANALYTICS_ID } from './constants';

render(<App gaId={GOOGLE_ANALYTICS_ID} />, document.getElementById('app'));
