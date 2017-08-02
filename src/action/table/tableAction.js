import { createAction,createReducer } from 'redux-act';
import {fetchEnd} from "../../util/util.js";

export const requestTable = createAction('TABLE_REQUEST',() => ({isFetching:true}));
export const receiveTable = createAction('TABLE_RECEIVE',(table) => table);
export const TableError = createAction('TABLE_FAILURE',(error) => error);

export function fetchTables(){
  return function (dispatch) {
    dispatch(requestTable());
    const url = '../../json/Table.json';
    const method = 'get';
    return (
      fetchEnd(url,method).then((res) => { return res.json(); })
      .then((data) => {
        const table = {
          data:data.rowData,
          isFetching:false
        }
        dispatch(receiveTable(table));
      })
      .catch((e) => {
      dispatch(TableError({
        error:e.message
      }));
      console.log(e.message);
      })
  );
  }
}
