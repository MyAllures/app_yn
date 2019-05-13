import * as types from '../action/actionTypes'
import moment from 'moment'


const initialState = {
	serverStatus: 0,
	reconnectTimes: 0,
  heatbeat: {},
}

export default function datafeed (state = initialState, action) {
	switch (action.type) {
    case types.DATA_SERVER_ONOPEN: 
      return Object.assign({}, state, { serverStatus: 1, reconnectTimes: 0 })
    
    case types.DATA_SERVER_HEARTBEAT:
      return Object.assign({}, state, { heatbeat: {
        timestamp: Date.now(),
        time: moment().format('HH:mm:ss:sss')
      } })
    
    case types.DATA_SERVER_RECONNECT:
      return Object.assign({}, state, { serverStatus: 2, reconnectTimes: state.reconnectTimes++ })
    
		default: return state
		}
	}


