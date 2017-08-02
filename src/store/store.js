import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../reducer/rootReducer.js';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const router = routerMiddleware(browserHistory);
const logger = createLogger();

const enhancer = compose(
  applyMiddleware(thunk, promise, router,logger)
);

function Store(initialState) {
     const storeCreator = createStore(rootReducer, initialState,enhancer);
     return storeCreator;
}

export default Store;
