import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/index'
import * as types from '../action/actionTypes.js'

const logger = createLogger({
	predicate: (getState, action) => action.type !== types.GET_OPTION_PRICE_PUSH, // 隐藏
	collapsed: (getState, action, logEntry) => !logEntry.error, // 隐藏非出错
})

const middleWares = []

middleWares.push(thunkMiddleware)

const enhancer = compose(
	applyMiddleware(...middleWares)
)

const store = createStore(
	rootReducer,
	enhancer
)

export default store
