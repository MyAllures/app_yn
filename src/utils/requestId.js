import moment from 'moment'

function getId (num) {
  num = num || '999'
  let fmt = 'HHmmssS' + num
  return Number(moment().format(fmt))
}

export default getId
