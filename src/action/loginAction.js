import { createAction,createReducer } from 'redux-act';
import {fetchEnd} from "../util/util.js";

export const requestLogin = createAction('LOGIN_REQUEST',() => ({isFetching:true}));
export const receiveLogin = createAction('LOGIN_RECEIVE',(table) => table);
export const LoginError = createAction('LOGIN_FAILURE',(error) => error);

export function fetchLogin(){
  return function (dispatch) {
    dispatch(requestLogin());
    const url = '../json/User.json';
    const method = 'get';
    return (
      fetchEnd(url,method).then((res) => { return res.json(); })
      .then((data) => {
        const login = {
          data:data.rowData,
          isFetching:false
        }
        dispatch(receiveLogin(login));
      })
      .catch((e) => {
      dispatch(LoginError({
        error:e.message
      }));
      console.log(e.message);
      })
  );
  }
}
