import {isFunc, isRegExp} from '../utils/judgement.js'

const validate = function (type, value, keys) {
	let rules = {
		noEmpty(keys) {
			// value = [] , {}, '', undefined, 0
			const objFlag = typeof value === 'object' && Object.keys(value).length === 0
			if (objFlag || !value) return keys[1] || `${keys[0] || ''}不能为空`
		},
		length(keys) {
			if (value.length !== keys[0]) return keys[1] || `长度必须为${keys[0]}位`
		},
		maxLength(keys) {
			if (value.length > keys[0]) return keys[1] || `长度必须小于等于${keys[0]}位`
		},
		minLength(keys) {
			if (value.length < keys[0]) return keys[1] || `长度必须大于等于${keys[0]}位`
		},
		min(keys) {
			if (value < keys[0]) return keys[1] || `必须大于等于${keys[0]}`
		},
		max(keys) {
			if (value > keys[0]) return keys[1] || `必须小于等于${keys[0]}`
		},
		equal(keys){
			if (value !== keys[0]) return keys[1] || '两次输入不一致'
		},
		type(keys) {
			let key = keys[0]
			let types = {
				number(value) {
					let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
					if (!reg.test(value)) return keys[1] || '必须为数字'
				},
				string(value) {
					if (!/^\w+$/.test(value)) return keys[1] || '必须为字符'
				},
				letter(value) {
					if (!/^[a-zA-Z]*$/.test(value)) return keys[1] || "必须由字母组成"
				},
				ID(value) {
					if (!/^[\d]+[x|X]*$/.test(value)) return keys[1] || "请输入有效的身份证号码"
				},
				password(value) {
					if (!/^[\w@#\$%\^\&\*\(\)\_\+\-\=\<\>\,\.\*\/\\`\~]*$/.test(value)) return keys[1] || "密码须由数字、字母或字符组成"
				},
				email(value) {
					let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        	if (!reg.test(value)) return keys[1] || '请输入正确的邮箱'
				},
				reg(value) {
					if (!isRegExp(keys[1])) throw new Error('type reg should has a RegExp input')
					if (!keys[1].test(value)) return keys[2] || keys[1] + '检测不通过'
				}
			}
			if (isFunc(types[key])) return types[key](value)
		},
	}
	if (isFunc(rules[type])) return rules[type](keys)
	return false
} 

export default validate
