import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Host from './components/Host';
import Hosts from './components/Hosts';
import JVM from './components/JVM';
import Services from './components/Services';
import Actions from './components/Actions';
import Nav from './components/Nav';

render(
  <Provider store={store}>
    <Router>
      <div>
        <Route component={Nav}/>
        <Route exact path="/hosts" component={Hosts}/>
        <Route exact path="/hosts/:address/jvm/:pid/:command?" component={JVM}/>
        <Route exact path="/hosts/:address" component={Host}/>
        <Route path="/services/:filterKey?/:filterValue?" component={Services}/>
        <hr/>
        <Actions/>
      </div>
    </Router>
  </Provider>
  , document.getElementById('root'));