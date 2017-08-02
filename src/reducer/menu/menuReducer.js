import initialState from '../initialState.js';
import { createReducer } from 'redux-act';
import * as action from '../../action/menu/menuAction.js';
var Objectassign = require('object-assign');

const menu = createReducer(function(on,off){
  on(action.requestMenu,(initialState,content) => Objectassign({},initialState,content));
  on(action.receiveMenu,(initialState,content) => Objectassign({},initialState,content));
  on(action.MenuError,(initialState,content) => Objectassign({},initialState,content));
},initialState);

export default menu;
