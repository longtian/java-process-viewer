import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Hosts from './components/Hosts';
import Services from './components/Services';
import Actions from './components/Actions';
import Nav from './components/Nav';

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route component={Nav}/>
        <Route path="/hosts" component={Hosts}/>
        <Route path="/services/:filterKey?/:filterValue?" component={Services}/>
        <hr/>
        <Actions/>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));