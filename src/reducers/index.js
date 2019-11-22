import { combineReducers } from 'redux'
import connect from './connect.js'
import datafeed from './datafeed.js'
import account from './account.js'

const bbnApp = combineReducers({
    connect,
    datafeed,
    account
})

export default bbnApp
