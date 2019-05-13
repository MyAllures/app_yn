export const type = function (obj) {
  if (obj == null) {
    return String(obj)
  } else {
    // 1. 获得名称
    let toString = {}.toString
    // 2. 创建字典
    let types = "Boolean Number String Function Array Date RegExp Object Error".split(' ')
    let lib = []
    types.forEach((key, index) => {
      lib['[object '+ key + ']'] = key.toLowerCase()
    })
    // 3. 进行判断
    if (lib[toString.call(obj)]) {
      return lib[toString.call(obj)]
    } else {
      return 'object'
    }
  }
}

const dict = {
	isBool: 'boolean',
	isNum: 'number',
	isStr: 'string',
	isFunc: 'function',
	isArr: 'array',
	isDate: 'date',
	isRegExp: 'regexp',
	isObj: 'object',
	isErr: 'error',
	isNull: 'null',
	isUndefined: 'undefined',
}
const judge = function (key, value) {
	if (type(value) === dict[key]) return true
	return false
}

export const isBool = (val)=>judge('isBool', val)
export const isNum = (val)=>judge('isNum', val)
export const isStr = (val)=>judge('isStr', val)
export const isFunc = (val)=>judge('isFunc', val)
export const isArr = (val)=>judge('isArr', val)
export const isDate = (val)=>judge('isDate', val)
export const isRegExp = (val)=>judge('isRegExp', val)
export const isObj = (val)=>judge('isObj', val)
export const isErr = (val)=>judge('isErr', val)
export const isNull = (val)=>judge('isNull', val)
export const isUndefined = (val)=>judge('isUndefined', val)
export const isURL = (str) => {
  var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
    + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
    + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
    + '|' // 允许IP和DOMAIN（域名） 
    + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
    + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
    + '[a-z]{2,6})' // first level domain- .com or .museum 
    + '(:[0-9]{1,4})?' // 端口- :80 
    + '((/?)|' // a slash isn't required if there is no file name 
    + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
  var re = new RegExp(strRegex); 
  //re.test() 
  if (re.test(str)) { 
    return (true); 
  } else { 
    return (false); 
  } 
}

