import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';
const element = document.createElement('div');
document.body.appendChild(element);

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , element);