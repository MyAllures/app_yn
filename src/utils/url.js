function encode (obj) {
	return Object.keys(obj).map(function(key){ 
	  return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
	}).join('<&>')
}

function querify (obj) {
	return Object.keys(obj).map(function(key){ 
	  return key + '=>' + obj[key]
	}).join('<&>')
}

function parse (string) {
	const tmp = string.slice(1).split('<&>')
	const obj = {}
	tmp.forEach((item) => {
		let tmp = item.split('=>')
		obj[tmp[0]] = tmp[1]
	})
	return obj
}

export default {
	encode,
	parse,
	querify,
}