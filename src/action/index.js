import {
  ONOPEN,
  RECONNECT,
  HEARTBEAT,
  DATA_SERVER_ONOPEN,
  DATA_SERVER_RECONNECT,
  DATA_SERVER_HEARTBEAT,
  ACCOUNT_LOGON_VERIFY
} from './actionTypes'

export const onOpen = () => {
	return {
		type: ONOPEN,
	}
}

export const reconnect = () => {
	return {
		type: RECONNECT,
	}
}

export const heartBeat = () => {
	return {
		type: HEARTBEAT,
	}
}

export const dataServerOnOpen = () => {
	return {
		type: DATA_SERVER_ONOPEN,
	}
}

export const dataServerReconnect = () => {
	return {
		type: DATA_SERVER_RECONNECT,
	}
}

export const dataServerHeartBeat = () => {
	return {
		type: DATA_SERVER_HEARTBEAT,
	}
}

export const accountLoginVerify = () => {
	return {
		type: ACCOUNT_LOGON_VERIFY
	}
}
