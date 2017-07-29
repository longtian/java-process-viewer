import { combineReducers } from 'redux';

import hosts from './host';
import messages from './messages';

export default combineReducers({
  hosts,
  messages
});