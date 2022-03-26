export const SEND_TOKEN = 'TOKEN';
export const SEND_PLAYER = 'PLAYER';
export const SEND_FETCH = 'FETCH';
export const TIME_OUT = 'TIME';
export const SEND_SCORE = 'SCORE';
export const SEND_FINISH = 'FINISH';
export const CLEAR_FETCH = 'CLEAR';
export const RESET_PLAYER = 'RESET';

export const actionToken = (payload) => ({ type: SEND_TOKEN, payload });
export const actionPlayer = (payload) => ({ type: SEND_PLAYER, payload });
export const actionFetchApi = (payload) => ({ type: SEND_FETCH, payload });
export const actionScore = (payload) => ({ type: SEND_SCORE, payload });
export const actionFinish = (payload) => ({ type: SEND_FINISH, payload });
export const actionClear = (payload) => ({ type: CLEAR_FETCH, payload });
export const actionResetPlayer = () => ({ type: RESET_PLAYER });

export function actionFetch(token) {
  return async (dispatch) => {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const fetchApi = await fetch(url);
    const response = await fetchApi.json();
    const number = 3;
    if (response.response_code === number) {
      const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
      const newToken = await fetchApiToken.json();
      localStorage.setItem('token', newToken.token);
      dispatch(actionFetch(newToken.token));
    } else dispatch(actionFetchApi(response));
  };
}
