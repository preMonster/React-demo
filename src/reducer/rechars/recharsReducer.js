import initialState from '../initialState.js';
import { createReducer } from 'redux-act';
import * as action from '../../action/rechars/recharAction.js';
var Objectassign = require('object-assign');

const rechar = createReducer(function(on,off){
  on(action.requestRechar,(initialState,content) => Objectassign({},initialState,content));
  on(action.receiveRechar,(initialState,content) => Objectassign({},initialState,content));
  on(action.RecharError,(initialState,content) => Objectassign({},initialState,content));
},initialState);

export default rechar;
