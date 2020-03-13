import { combineReducers } from 'redux-immutable';
import counter from './counter';
import api from './api';
import auth from './auth';

export default combineReducers({
  counter,
  api,
  auth,
});
