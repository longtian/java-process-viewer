import React from 'react';
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Hosts from './components/Hosts';
import Services from './components/Services';
import Actions from './components/Actions';

const element = document.createElement('div');
document.body.appendChild(element);

render(
  <Provider store={store}>
    <Router>
      <div>
        <ul className="nav nav-tabs">
          <li>
            <NavLink activeClassName="active" to="/hosts">Hosts</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/services">Services</NavLink>
          </li>
        </ul>
        <hr/>
        <Actions/>
        <hr/>
        <Route path="/hosts" component={Hosts}/>
        <Route path="/services/:filterKey?/:filterValue?" component={Services}/>
      </div>
    </Router>
  </Provider>
  , element);