// API 模板
function apiFactory (root) {
  function API (id, reqKey, respKey) {
    this.id = id
    this.reqKey = reqKey
    this.respKey = respKey
  }
  API.prototype.encode = function (params, sessionId) {
    let Message = root.lookupType(this.reqKey)
    return covertBuffer(Message, params)
  }
  API.prototype.decode = function (data) {
    let Message = root.lookupType(this.respKey)
    let body = new Uint8Array(data)
    // 丢入msg类型之中进行decode即可得到正常的数据对象
    // debugger
    let msg = Message.decode(body)

    return msg
  }
  return API
}

// 4位字节数组转成整型
function bytes2int (x) {
  if (!x || x.length !== 4) {
    throw new Error('无效的数据')
  }
  let bytes = x.reverse()
  let nTemp, nResult
  nResult = 0
  nTemp = bytes[0] & 0xFF
  nTemp = nTemp << 24
  nResult = nResult | nTemp
  nTemp = bytes[1] & 0xFF
  nTemp = nTemp << 16
  nResult = nResult | nTemp
  nTemp = bytes[2] & 0xFF
  nTemp = nTemp << 8
  nResult = nResult | nTemp
  nTemp = bytes[3] & 0xFF
  nResult = nResult | nTemp
  return nResult
}

// 整形转换成4位字节数组
function getInt64Bytes (x) {
  var bytes = []
  bytes[3] = ((x >> 24) & 0xFF)
  bytes[2] = ((x >> 16) & 0xFF)
  bytes[1] = ((x >> 8) & 0xFF)
  bytes[0] = (x & 0xFF)
  return bytes
}

// 根据API Builder对象及参数, 生成发送的字节数组
function covertBuffer (Builder, params) {
  let buffer = null
  let build = Builder.create(params)
  buffer = Builder.encode(build).finish()
  return buffer
}

module.exports = {
  apiFactory,
  bytes2int,
  getInt64Bytes
}
