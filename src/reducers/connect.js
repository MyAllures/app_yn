import * as types from '../action/actionTypes'
import moment from 'moment'


const initialState = {
	serverStatus: 0,
	reconnectTimes: 0,
  heatbeat: {},
  isLogin: false,
  loginId: ''
}

export default function connect (state = initialState, action) {
	switch (action.type) {
    case types.ONOPEN: 
      return Object.assign({}, state, { serverStatus: 1, reconnectTimes: 0 })
    
    case types.HEARTBEAT:
      return Object.assign({}, state, { heatbeat: {
        timestamp: Date.now(),
        time: moment().format('HH:mm:ss:sss')
      } })
    
    case types.RECONNECT:
      return Object.assign({}, state, { serverStatus: 2, reconnectTimes: state.reconnectTimes++ })
    
    case types.ACCOUNT_LOGON_VERIFY: 
      return Object.assign({}, state, { isLogin: true, loginId: action.loginId })
			
		default: return state
		}
	}


