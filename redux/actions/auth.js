import { createActions } from 'redux-actions';
import * as actionTypes from './action-types';
import { defaultAction } from '.';

export const {
  authSuccess
} = createActions({
  [actionTypes.AUTH_SUCCESS]: defaultAction
})
