import React from 'react';
import { render } from 'react-dom';
import App from './index';
console.log('window', window.__APP_INITIAL_STATE__);
render(<App {...window.__APP_INITIAL_STATE__} />, document.getElementById('root'));
