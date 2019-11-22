import * as types from '../action/actionTypes'

const defaultState = {
  accountBalance: {}
}

export default function account (state = defaultState, action) {
  switch (action.type) {
    case types.ACCOUNT_BALANCE: 
      return {...state, accountBalance: action.balance}
    default: return state
  }
}