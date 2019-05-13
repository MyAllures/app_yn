import {wsReconnectTime, maxReconnectTimes} from '../constants/Url.js'
import toBuffer from 'blob-to-buffer'

function isFunc (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}

function Ws (url, heartBeatTime, reconnectTimes) {
  this.url = url
  this.heartBeatTime = heartBeatTime || 60
  this.reconnectTimes = reconnectTimes || maxReconnectTimes

  this._timer = null
  this._heart = null
  this._channel = {}
  this._sendCache = [] // 发送缓存
  this._recoverTimes = 0 // 重连次数
  this._isBreakLine = false // 是否主动断线
  this.api = {}
}

Ws.prototype = {
  constructor: Ws,
  /*
   * WS服务器的操作
   * @method _init
   * @param {boolean} value
   * @property {function} onopen -- 连接成功后，进行心跳处理
   * @property {function} onerror -- 交互出错，回调处理
   * @property {function} onclose -- 连接关闭，断线重连
   * @property {function} onmessage -- 收到数据，回调处理
  */
  _init: function (value) {
    if (!value) {
      this._isBreakLine = value
    }
    if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
      try {
        this._ws = new WebSocket(this.url)
      } catch (e) {
        console.warn(e)
      }

      this._ws.onopen = () => {
        this._timer = null
        this._recoverTimes = 0
        this.fire('_onopen')
        if (this._heart) {
          clearInterval(this._heart)
          this._heart = null
        }
        this.send(this.api.request(0, {}))
        this._heart = setInterval(() => {
          this.send(this.api.request(0, {}))
        }, this.heartBeatTime * 1000)
        this._clearCache()
      }

      this._ws.onerror = (e) => {}

      this._ws.onclose = (e) => {
        this.reconnect('onclose')
      }

      this._ws.onmessage = (e) => {
        // console.log(e.data)
        let result = {}
        if (e.data instanceof Blob) {
          toBuffer(e.data, function (err, buffer) {
            try {
              result = this.api.response(buffer)
            } catch (err) {
              return console.log('[ws2 解析出错]', err, e.data)
            }
            this.fire(result.key, result)
          })
        } else if (e.data instanceof File) {
          console.log('没有对file to array类型的处理方式')
        } else {
          try {
            result = this.api.response(e.data)
          } catch (err) {
            return console.log('[ws2 解析出错]', err, e.data)
          }
          console.log(result.key, result)
          this.fire(result.key, result)
        }
        // let reader = new FileReader()
        // console.log(e.data)
        // reader.readAsArrayBuffer(e.data)
        // reader.onload = () => {
        //   try {
        //     result = this.api.response(reader.result)
        //   } catch (err) {
        //     return console.log('[ws2 解析出错]', err, e.data)
        //   }
        //   this.fire(result.key, result)
        // }
      }
      return true
    }
    return false
  },

  /*
   * 客户端断线重连 -- 先清除心跳处理，后断线重连
   * @method reconnect
   * @param {object} reson -- 断线方式
  */
  reconnect: function (reson) {
    if (this._isBreakLine) {
      return false
    }
    if (this._recoverTimes >= this.reconnectTimes) {
      // this.$alert(
      //   '网络连接失败',
      //   `超出最大重连次数[${reconnectTimes}],请检查您的网络,或联系客服反馈.`
      // )
      this._recoverTimes = 0
      this._timer = null
      this._channel = {}
      this._sendCache = []
      this._heart = null
      return false
    }
    this.fire('reconnect', {reson, times: this._recoverTimes + 1})
    if (this._heart) {
      clearInterval(this._heart)
      this._heart = null
    }
    if (!this._timer) {
      const interval = wsReconnectTime || 3
      this._timer = setTimeout(() => {
        this._timer = null
        this._ws = null
        this._recoverTimes++
        this._init()
      }, 1000 * interval)
    }
  },
  /*
   * 添加方法到数组channel中
   * @method add
   * @key {string} key -- 方法名
   * @cb {function} cb -- 回调函数
  */
  add: function (key, cb) {
    if (!this._channel[key]) {
      this._channel[key] = []
    }
    if (this._channel[key].indexOf(cb) === -1) {
      this._channel[key].push(cb)
    }
  },
  remove: function (key, fn) {
    const channel = this._channel[key]
    if (!channel || !channel.length) { return }
    if (!fn) {
      this._channel[key] = []
      return this._channel[key]
    }
    (function del (arr, target) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === target) {
          arr.splice(i, 1)
          del(arr, target)
        }
      }
    })(channel, fn)
  },
  /*
   * 释放channel中指定方法
   * @method fire
   * @param {string} key -- 方法名
   * @data {object} data -- 数据
  */
  fire: function (key, data) {
    // console.log(key, data)
    key = key || 'default'
    const store = this._channel[key]
    if (!key || !store) {
      return console.log('[fire empty]', key, data)
    }
    store.forEach((fn) => {
      if (isFunc(fn)) {
        fn(data)
      }
    })
  },
  /*
   * 增强发送请求的健壮性，断线提示处理
   * @method send
   * @param {object} data -- 请求数据
  */
  send: function (data) {
    // 下一个指令周期, 防止状态为更新
    setImmediate(() => {
      if (typeof data !== 'object') {
        console.warn('[data type error]', typeof data, data)
        return false
      }
      if (!this._ws || !isFunc(this._ws.send) || this._ws.readyState !== WebSocket.OPEN) {
        this._sendCache.push(data)
        this.reconnect('send')
        return false
      }
      this._ws.send(data)
    })
  },
  /*
   * 清空首次发送缓存
   * @method _clearCache
  */
  _clearCache: function () {
    while (this._sendCache.length > 0) {
      const hasSent = this.send(this._sendCache[0])
      if (!hasSent) {
        break
      }
      this._sendCache.shift()
    }
  },
  destory: function () {
    this._ws.close()
    this._isBreakLine = true
    clearInterval(this._heart)
    this._heart = null
    this._ws = null
    this._recoverTimes = 0
    clearInterval(this._timer)
    this._timer = null
    this._channel = {}
    this._sendCache = []
  },
  init: function (api) {
    this.api = api
    this._init(false)
  }
}

export default Ws
