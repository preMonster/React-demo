import initialState from '../initialState.js';
import { createReducer } from 'redux-act';
import * as action from '../../action/table/tableAction.js';
var Objectassign = require('object-assign');

const table = createReducer(function(on,off){
  on(action.requestTable,(initialState,content) => Objectassign({},initialState,content));
  on(action.receiveTable,(initialState,content) => Objectassign({},initialState,content));
  on(action.TableError,(initialState,content) => Objectassign({},initialState,content));
},initialState);

export default table;
