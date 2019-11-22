import * as types from './actionTypes'

import * as url from '../constants/Url'

export const onOpen = () => {
	return {
		type: types.ONOPEN,
	}
}

export const reconnect = () => {
	return {
		type: types.RECONNECT
	}
}

export const heartBeat = () => {
	return {
		type: types.HEARTBEAT
	}
}

export const dataServerOnOpen = () => {
	return {
		type: types.DATA_SERVER_ONOPEN
	}
}

export const dataServerReconnect = () => {
	return {
		type: types.DATA_SERVER_RECONNECT
	}
}

export const dataServerHeartBeat = () => {
	return {
		type: types.DATA_SERVER_HEARTBEAT
	}
}

export const accountLoginVerify = () => {
	return {
		type: types.ACCOUNT_LOGON_VERIFY
	}
}

export const accountBalance = dispatch => {
	return fetch(url.ACCOUNT_BALANCE)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
		})
		.then(res => {
			console.log('[账户资金信息]', res)
			dispatch({type: types.ACCOUNT_BALANCE, balance: res})
		})	
		.catch(error => {
			console.log(error)
		})
}

