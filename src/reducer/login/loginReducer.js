import initialState from '../initialState.js';
import { createReducer } from 'redux-act';
import * as action from '../../action/loginAction.js';
var Objectassign = require('object-assign');

const login = createReducer(function(on,off){
  on(action.requestLogin,(initialState,content) => Objectassign({},initialState,content));
  on(action.receiveLogin,(initialState,content) => Objectassign({},initialState,content));
  on(action.LoginError,(initialState,content) => Objectassign({},initialState,content));
},initialState);

export default login;
