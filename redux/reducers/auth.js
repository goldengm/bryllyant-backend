import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/action-types';

const defaultState = Map({
  isAuthed: false,
  token: null
});

export default handleActions({
  [actionTypes.AUTH_SUCCESS]: (state, { payload }) => state
    .set('isAuthed', true)
    .set('token', payload.token),
}, defaultState);
