const protobufjs = require('protobufjs')
// const path = require('path')
const apiUtils = require('./apiUtils.js')
// protobuf.Root.fromJSON()

function APIStore (protoFile, initApi) {
  if (!initApi && typeof initApi !== 'function') {
    throw new Error('API构造器，必须传入有效的构造器函数！')
  }
  this.Api = {}
  this.isReady = false
  this.initApi = initApi
  this._proto = protoFile
}

/*
 * 初始化
 * @method init
 * @param {function} cb -- 回调函数
*/
APIStore.prototype.init = function init (callback) {
  const { Api, _proto } = this
  // protobufjs.load(_proto, (err, root) => {
  //   if (err) {
  //     throw new Error(err)
  //   }
  let root = protobufjs.Root.fromJSON(_proto)
  Object.assign(Api, this.initApi(apiUtils.apiFactory(root)))
  Object.keys(Api).forEach(function (key) {
    Api[key].key = key
    Api[Api[key].id] = Api[key]
  })
  this.isReady = true
  callback && callback()
  // })
}

/*
 * 请求
 * @method request
 * @param {string} id -- 标识
 * @param {object} params -- 标识数据
 * @return {array} ints -- 将标识和标识数据转化为Uint8Array数据
*/
APIStore.prototype.request = function request (id, params) {
  const { Api } = this
  if (!this.isReady) {
    throw new Error('非法请求，必须先进行初始化')
  }
  if (id === undefined || !Api[id]) {
    throw new Error('非法请求，必须传递有效的 id 值')
  }
  // console.log('params1', params, Api[id])
  params = params || {}
  let buffer = Api[id].encode(params)
  let ints = new Uint8Array(buffer.byteLength + 4)
  let bytes = apiUtils.getInt64Bytes(Api[id].id)
  ints[0] = bytes[0]
  ints[1] = bytes[1]
  ints[2] = bytes[2]
  ints[3] = bytes[3]
  for (let i = 0; i < buffer.length; i++) {
    ints[i + 4] = buffer[i]
  }
  // console.log('请求:', id, Api[id].id, params, ints, buffer)
  return ints
}

/*
 * 响应
 * @method response
 * @param {object} data -- 服务器传回数据
 * @return {object} object -- 将buffer转为object
*/
APIStore.prototype.response = function response (data) {
  const { Api } = this
  if (!this.isReady) {
    throw new Error('非法请求，必须先进行初始化')
  }
  // 之后将buffer转为Uint8Array
  let messageId = new Uint8Array(data).slice(0, 4)
  messageId = apiUtils.bytes2int(messageId)
  messageId = '' + messageId

  if (!messageId) {
    console.warn('不存在MessageId')
    return
  }

  if (!Api[messageId]) {
    console.warn(`未找到有关API[${Api[messageId]}]的数据处理, 请在Api中添加相关处理`)
    return
  }

  let body = new Uint8Array(data).slice(4)
  return Object.assign({messageId, key: Api[messageId].key}, Api[messageId].decode(body))
}

export default APIStore
