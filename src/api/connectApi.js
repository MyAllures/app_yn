import APIStore from './APIStore'
const protoFile = require('./protobuf/api_server.json')
// 业务接口
function initConnectApi (API) {
  const Api = {}

  Api['HEARTBEAT'] = new API(0, 'HeartbeatRequest', 'HeartbeatResponse')
  Api['ACCOUNT_LOGON'] = new API(1, 'AccountLogonRequest', 'AccountLogonResponse')
  Api['ACCOUNT_LOGON_VERIFY'] = new API(2, 'AccountLogonVerifyRequest', 'AccountLogonVerifyResponse')
  Api['CREATE_ORDER'] = new API(3, 'CreateOrderRequest', 'CreateOrderResponse')
  Api['CANCEL_ORDER'] = new API(4, 'CancelOrderRequest', 'CancelOrderResponse')
  Api['QUERY_ACCOUNT_ORDER'] = new API(5, 'QueryAccountOrderRequest', 'QueryAccountOrderResponse')
  Api['ACCOUNT_ORDER_PUSH'] = new API(6, 'SubscribeAccountOrder', 'AccountOrderPush')
  Api['QUERY_ACCOUNT_TRADE'] = new API(7, 'QueryAccountTradeRequest', 'QueryAccountTradeResponse')
  Api['ACCOUNT_TRADE_PUSH'] = new API(8, 'SubscribeAccountTrade', 'AccountTradePush')
  Api['QUERY_ACCOUNT_POSITION'] = new API(9, 'QueryAccountPositionRequest', 'QueryAccountPositionResponse')
  Api['ACCOUNT_POSITION_PUSH'] = new API(10, 'SubscribeAccountPosition', 'AccountPositionPush')
  Api['ACCOUNT_BALANCE_PUSH'] = new API(11, 'SubscribeAccountBalance', 'AccountBalancePush')
  Api['QUERY_SYMBOL_LIST'] = new API(12, 'QuerySymbolListRequest', 'QuerySymbolListResponse')
  Api['ACCOUNT_SYMBOL_SETTINGS_PUSH'] = new API(13, 'SubscribeAccountSymbolSettings', 'AccountSymbolSettingsPush')
  Api['QUERY_SYMBOL_CLASS_LIST'] = new API(14, 'QuerySymbolClassListRequest', 'QuerySymbolClassListResponse')

  return Api
}

export default new APIStore(protoFile, initConnectApi)
