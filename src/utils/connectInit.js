import Ws2 from './ws2'

const mainHost = 'quote.desktop.bbncapital.com/' // 业务服务器
const dataHost = '192.168.8.146:6333' // 行情服务器

export const mainServer =  new Ws2('ws://' + mainHost)

export const dataServer =  new Ws2('ws://' + dataHost)