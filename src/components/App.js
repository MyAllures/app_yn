import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-native'
import { View } from 'react-native'
import Toast from 'react-native-root-toast'
import MeScreen from './MeScreen/index.js'
import TradeScreen from './TradeScreen/index.js'
import QuotesScreen from './QuotesScreen/index.js'
import LoginScreen from './LoginScreen.js'
import RegisterScreen from './RegisterScreen.js'
import SettingScreen from './MeScreen/SettingScreen.js'
import AboutBBNScreen from './MeScreen/AboutBBNScreen.js'
import FuturesAccountScreen from './MeScreen/FuturesAccountScreen.js'
import StockFuturesScreen from './QuotesScreen/StockFuturesScreen.js'
import KLineScreen from './QuotesScreen/KLineScreen.js'
import MarketOrderScreen from './MarketOrderScreen/index.js'

import store from '../store/configure-store.js'
import * as action from '../action/index'
import api from '../api/connectApi'
import { mainServer, dataServer } from '../utils/connectInit'
import requestId from '../utils/requestId'

class App extends Component {
  constructor() {
    super()
    
  }

  connectInit() {

    const LoginCache = {
      loginID: '',
      password: '',
      timer: null,
      timeout: 5000,
      clearTimer () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
      }
    }

    mainServer.init(api)
    dataServer.init(api)
    
    // 业务服务器连接成功
    mainServer.add('_onopen', () => {
      console.log('业务服务器连接成功')
      store.dispatch(action.onOpen())
      Toast.show('业务服务器连接成功 ', {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
      })
    })
    
    // 重连
    mainServer.add('reconnect', () => {
      console.log('reconnect')
      store.dispatch(action.reconnect())
      Toast.show('业务服务器连接中断 ', {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    })

    // 心跳
    mainServer.add('HEARTBEAT', (msg) => {
      // console.log('HEARTBEAT', msg)
      store.dispatch(action.heartBeat())
    })

    mainServer.add('ACCOUNT_LOGON', (msg) => {
      console.log('预登录返回', msg)
      let params = {
        requestId: requestId('002'),
        rnd: msg.rnd,
        sess: msg.sess,
        logonId: LoginCache.loginID,
        password: LoginCache.password
      }
      mainServer.send(api.request('ACCOUNT_LOGON_VERIFY', params))
    })

    mainServer.add('ACCOUNT_LOGON_VERIFY', (msg) => {
      console.log('登录返回', msg)
      LoginCache.clearTimer()
      store.dispatch(action.accountLoginVerify())
    })

    // 行情服务器连接成功
    dataServer.add('_onopen', () => {
      console.log('行情服务器链接成功')
      store.dispatch(action.dataServerOnOpen())
      Toast.show('行情服务器连接成功 ', {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        }
      })
    })

    // 重连
    dataServer.add('reconnect', () => {
      console.log('行情服务器连接中断')
      store.dispatch(action.dataServerReconnect())
      Toast.show('行情服务器连接中断', {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    })

    // 心跳
    dataServer.add('HEARTBEAT', (msg) => {
      // console.log('HEARTBEAT', msg)
      store.dispatch(action.dataServerHeartBeat())
    })

  }

  render() {
    return (
      <View style={{flex:1}}>
        <Route exact path="/" component={MarketOrderScreen} />
        <Route path="/Me" component={MeScreen} />
        <Route path="/Trade" component={TradeScreen} />
        <Route path="/Quotes" component={QuotesScreen} />
        <Route path="/Login" component={LoginScreen} />
        <Route path="/Register" component={RegisterScreen} />
        <Route path="/Setting" component={SettingScreen} />
        <Route path="/About-BBN" component={ AboutBBNScreen } />
        <Route path="/Futures-Account" component={ FuturesAccountScreen } />
        <Route path="/Stock-Futures" component={ StockFuturesScreen } />
        <Route path="/K-Line" component={ KLineScreen } />
        <Route path="/Market-Order" component={ MarketOrderScreen } />
      </View>
    )
  }

  componentDidMount() {
    this.connectInit()
  }
}

export default withRouter(App)
