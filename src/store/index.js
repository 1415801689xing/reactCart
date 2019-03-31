import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import counterReducer from './counter.redux';
import userReducer from './user.redux';

export default createStore (
  combineReducers ({counterReducer, userReducer}),
  applyMiddleware (logger, thunk)
);
