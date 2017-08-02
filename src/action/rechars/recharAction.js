import { createAction,createReducer } from 'redux-act';
import {fetchEnd} from "../../util/util.js";

export const requestRechar = createAction('RECHAR_REQUEST',() => ({isFetching:true}));
export const receiveRechar = createAction('RECHAR_RECEIVE',(rechar) => rechar);
export const RecharError = createAction('RECHAR_FAILURE',(error) => error);

export function fetchRechars(){
  return function (dispatch) {
    dispatch(requestRechar());
    const url = '../../json/Rechars.json';
    const method = 'get';
    return (
      fetchEnd(url,method).then((res) => { return res.json(); })
      .then((data) => {
        const rechar = {
          data:data,
          isFetching:false
        }
        dispatch(receiveRechar(rechar));
      })
      .catch((e) => {
      dispatch(RecharError({
        error:e.message
      }));
      console.log(e.message);
      })
  );
  }
}
