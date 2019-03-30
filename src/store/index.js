import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import counterReducer from './counter.redux'

export default createStore(counterReducer, applyMiddleware(logger, thunk))


