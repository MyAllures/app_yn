// 正式主机
let host = 'http://real.v2.desktop.bbncapital.com'

let homepage = 'http://china.bbncapital.com'
if (process.env.NODE_ENV !== 'production') {
  // 测试主机
  host = '/api'
  homepage = 'http://china.bbnwork.top'
}
export const Host = host
export const Login = host + '/user/login'
export const LOGOUT = host + '/user/logout'
export const ACCOUNTINFO = host + '/user/account'
export const ACCOUNTFUNDINFO = host + '/user/fund'
export const TADAYORDER = host + '/strategy/order/list'

export const PRODUCTLIST = host + '/strategy/list'
export const PRODUCTRECOMMENDLIST = host + '/strategy/recommendList'
export const CLOSE_POSITION = host + '/strategy/order/close'
export const REVOK_EORDER = host + '/strategy/handleOrder/repeal'
export const AllCLOSEPOSITION = host + '/strategy/order/batchClose'
export const EXCHANGETIME = host + '/tools/exchangeTime'

export const wsReconnectTime = 1.5
export const maxReconnectTimes = 3000

export const URL_WEBSOCKET_QUOTES = 'ws://real.quote.desktop.bbncapital.com/'
export const URL_WEBSOCKET_INFO = 'ws://real.bsl.desktop.bbncapital.com/'
// export const URL_WEBSOCKET_MAIN = 'ws://192.168.8.163:9155'
export const URL_WEBSOCKET_MAIN = 'ws://192.168.8.125:9155'

export const ResetPasswordPage = homepage + '/ResetPassword.html'
export const RegisterPage = homepage + '/LoginAndRegister.html#!/register'
export const Homepage = homepage
