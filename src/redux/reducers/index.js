import { combineReducers } from 'redux';
import token from './token';
import player from './player';
import fetch from './fetch';

const rootReducer = combineReducers({
  token,
  player,
  fetch,
});

export default rootReducer;
