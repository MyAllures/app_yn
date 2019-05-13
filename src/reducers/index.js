import { combineReducers } from 'redux'
import connect from './connect.js'
import datafeed from './datafeed.js'

const bbnApp = combineReducers({
    connect,
    datafeed
})

export default bbnApp
