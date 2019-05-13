import APIStore from '@/api/APIStore'
const protoFile = require('./protobuf/data_feed_server.json')

// 业务接口
function initDatafeedApi (API) {
  const Api = {}

  Api['HEARTBEAT'] = new API(0, 'HeartbeatRequest', 'HeartbeatResponse')
  Api['SYMBOL_PRICE_INFO_PUSH'] = new API(16, 'SubscribeSymbolPriceInfo', 'SymbolPriceInfoPush')
  Api['SYMBOL_LAST_K_LINE_DATA_PUSH'] = new API(17, 'SubscribeSymbolLastKLineData', 'SymbolLastKLineDataPush')
  Api['QUERY_SYMBOL_K_LINE_DATA_LIST'] = new API(18, 'QuerySymbolKLineDataListRequest', 'QuerySymbolKLineDataListResponse')
  // Api['QUERY_SYMBOL_TODAY_K_LINE_LIST'] = new API(19, 'QuerySymbolTodayKLineListRequest', 'QuerySymbolTodayKLineListResponse')
  Api['SYMBOL_MARKET_DEPTH_PUSH'] = new API(21, 'SubscribeSymbolMarketDepth', 'SymbolMarketDepthPush')

  return Api
}

export default new APIStore(protoFile, initDatafeedApi)
