// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_TOKEN } from '../action/index';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_TOKEN:
    return action.payload;
  default:
    return state;
  }
};

export default tokenReducer;
