import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import testReducer from './testReducer/testReducer.js';
import menu from './menu/menuReducer.js';
import table from './table/tableReducer.js';
import rechar from './rechars/recharsReducer.js';
import login from './login/loginReducer.js';

const rootReducer = combineReducers({
  testReducer,
  menu,
  table,
  rechar,
  login,
  routing:routerReducer
});

export default rootReducer;
