import { SEND_PLAYER,
  SEND_SCORE,
  SEND_FINISH,
  RESET_PLAYER,
  CLEAR_FETCH } from '../action/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarImage: '',
  finish: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_FINISH:
    return {
      ...state, finish: action.payload,
    };
  case RESET_PLAYER:
    return INITIAL_STATE;
  case SEND_PLAYER:
    return {
      ...state,
      name: action.payload.userName,
      gravatarEmail: action.payload.userEmail,
      gravatarImage: action.payload.url,
    };
  case SEND_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case CLEAR_FETCH:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default playerReducer;
