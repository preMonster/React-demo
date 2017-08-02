import { createAction,createReducer } from 'redux-act';
import {fetchEnd} from "../../util/util.js";

export const requestMenu = createAction('MENU_REQUEST',() => ({isFetching:true}));
export const receiveMenu = createAction('MENU_RECEIVE',(menu) => menu);
export const MenuError = createAction('MENU_FAILURE',(error) => error);

export function fetchMenus(){
  return function (dispatch) {
    dispatch(requestMenu());
    const url = '../../json/Menu.json';
    const method = 'get';
    return (
      fetchEnd(url,method).then((res) => { return res.json(); })
      .then((data) => {
        const menu = {
          data:data.rowData,
          isFetching:false
        }
        dispatch(receiveMenu(menu));
      })
      .catch((e) => {
      dispatch(MenuError({
        error:e.message
      }));
      console.log(e.message);
      })
  );
  }
}
