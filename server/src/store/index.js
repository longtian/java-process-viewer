import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxPromise))
);
export default store;
