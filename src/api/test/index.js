import api from '@/api/api.js'
// import { URL_WEBSOCKET_MAIN } from '@/constants/Url.js'
import requestId from '@/utils/requestId'

// const TestServer = 'ws://192.168.1.163:9155'
const TestServer = 'ws://192.168.8.146:9155'

let symbolList = []
let canCancleOrder = false

/*
 * WebSocket配置 --> 连接 | 接收 | 错误处理 | 断开
 * @method test
*/
function test (host) {
  host = host || TestServer
  var ws = new WebSocket(host)
  ws.onopen = function (e) {
    let data0 = { requestId: requestId('000') }
    // 将object转为Uint8Array数据
    console.log('心跳请求', data0)
    ws.send(api.request('HEARTBEAT', data0))
  }
  ws.onmessage = function (e) {
    let reader = new FileReader()
    reader.readAsArrayBuffer(e.data)
    reader.onload = function () {
      let result = api.response(reader.result)
      demo(ws, result)
    }
  }
  ws.onerror = function (e) {
    console.warn('连接出错', e)
  }
  ws.onclose = function (e) {
    console.warn('连接关闭', e)
  }
}

/*
 * 模拟Api请求
 * @method demo
 * @param {object} ws -- WebSocket服务器
 * @param {object} msg -- 服务器传回数据
*/
function demo (ws, msg) {
  const AccountId = '8006003'
  const Password = '8006003'

  switch (msg.messageId) {
    case '0':
      console.log('HEARTBEAT', msg)
      let data1 = {
        reuestId: requestId('001'),
        ipAddress: window.returnCitySN.cip
      }
      console.log('登录请求', data1)
      ws.send(api.request('ACCOUNT_LOGON', data1))
      break
    case '1':
      console.log('ACCOUNT_LOGON', msg)
      // let data2 = {
      //   requestId: requestId('002'),
      //   logonId: AccountId,
      //   versionType: 1,
      //   languageType: 1
      // }
      let data2 = {
        requestId: requestId('002'),
        logonId: AccountId,
        rnd: msg.rnd,
        sess: msg.sess,
        password: Password
      }
      console.log('验证账号', data2)
      // ws.send(api.request('ACCOUNT_LOGON_ID_VERIFY', data2))
      ws.send(api.request('ACCOUNT_LOGON_VERIFY', data2))
      break
    case '2':
      console.log('ACCOUNT_LOGON_ID_VERIFY', msg)
      let eRND = msg.eRND
      let eSESS = msg.eSESS
      let sessionKey = msg.sessionKey || ''
      let e2RND = window.hex_md5(window.SHA256(Password) + eRND + eSESS)
      let data3 = {
        requestId: requestId('003'),
        sessionKey,
        e2RND
      }
      console.log('验证密码', data3)
      ws.send(api.request('ACCOUNT_LOGON_PASSWORD_VERIFY', data3))
      break
    case '3':
      // console.log('ACCOUNT_LOGON_PASSWORD_VERIFY', msg)
      console.log('ACCOUNT_LOGON_VERIFY', msg)

      // 查询订单记录
      let data6 = {
        requestId: requestId('006')
      }
      console.log('查询订单记录', data6)
      ws.send(api.request('QUERY_ACCOUNT_ORDER', data6))

      // 订阅订单数据
      let data7 = {
        requestId: requestId('007'),
        subscribe: true
      }
      console.log('订阅订单数据', data7)
      ws.send(api.request('ACCOUNT_ORDER_PUSH', data7))

      // 查询交易记录
      let data8 = {
        requestId: requestId('008')
      }
      console.log('查询交易记录', data8)
      ws.send(api.request('QUERY_ACCOUNT_TRADE', data8))

      // 订阅成交记录
      let data9 = {
        requestId: requestId('009'),
        subscribe: true
      }
      console.log('订阅成交记录', data9)
      ws.send(api.request('ACCOUNT_TRADE_PUSH', data9))

      // 查询持仓记录
      let data10 = {
        requestId: requestId('010')
      }
      console.log('查询持仓记录', data10)
      ws.send(api.request('QUERY_ACCOUNT_POSITION', data10))

      // 订阅持仓记录
      let data11 = {
        requestId: requestId('011'),
        subscribe: true
      }
      console.log('订阅持仓记录', data11)
      ws.send(api.request('ACCOUNT_POSITION_PUSH', data11))

      // 订阅账户资金信息
      let data12 = {
        requestId: requestId('012'),
        subscribe: true
      }
      console.log('订阅账户资金信息', data12)
      ws.send(api.request('ACCOUNT_BALANCE_PUSH', data12))

      // 请求 symbol 列表
      let data13 = { requestId: requestId('013') }
      console.log('请求 symbol 列表', data13)
      ws.send(api.request('QUERY_SYMBOL_LIST', data13))

      // 订阅账户 symbol 设置
      let data14 = { requestId: requestId('014') }
      console.log('订阅账户 symbol 设置', data14)
      ws.send(api.request('ACCOUNT_SYMBOL_SETTINGS_PUSH', data14))
      break
    case '4':
      console.log('CREATE_ORDER', msg)
      if (!canCancleOrder) {
        canCancleOrder = true
        // 撤销订单
        let data5 = {
          requestId: requestId('005'),
          orderNo: msg.orderNo,
          symbol: symbolList[0].symbol
        }
        console.log('撤销订单', data5)
        ws.send(api.request('CANCEL_ORDER', data5))
      }
      break
    case '5':
      console.log('CANCEL_ORDER', msg)
      break
    case '6':
      console.log('QUERY_ACCOUNT_ORDER', msg)
      break
    case '7':
      console.log('ACCOUNT_ORDER_PUSH', msg)
      break
    case '8':
      console.log('QUERY_ACCOUNT_TRADE', msg)
      break
    case '9':
      console.log('ACCOUNT_TRADE_PUSH', msg)
      break
    case '10':
      console.log('QUERY_ACCOUNT_POSITION', msg)
      break
    case '11':
      console.log('ACCOUNT_POSITION_PUSH', msg)
      break
    case '12':
      console.log('ACCOUNT_BALANCE_PUSH', msg)
      break
    case '13':
      console.log('QUERY_SYMBOL_LIST', msg)
      symbolList = msg.symbols
      let symbol = msg.symbols[0].symbol
      let data4 = {
        requestId: requestId('004'),
        accountId: AccountId,
        symbol,
        direction: 0,
        orderType: 0,
        limitPrice: 1992.12,
        qty: 1,
        stopLossNumber: 1980.0,
        timestamp: Date.now()
      }
      console.log('创建订单', data4)
      ws.send(api.request('CREATE_ORDER', data4))
      break
    case '14':
      console.log('ACCOUNT_SYMBOL_SETTINGS_PUSH', msg)
      break
    default:
      break
  }
}
export default test
