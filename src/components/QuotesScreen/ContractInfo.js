import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'

const contractData = {
		name: '道琼斯指数1811',
		code: 'YM1811',
		alias: '迷你道指、小道指',
		type: '股指期货',
		currency: '澳币AUD',
		value: '指数点数x5澳币',
		date: '17:00-15:15 ，15:30-16:00',
		timeZone: 'CST美国中部标准时',
		tradingDay: '2018-11-30',
		specification: '规格链接'
	}


class ContractInfo extends Component {
	render () {
		return (
			<View style={styles.itemWrap}>
				<View style={styles.item}>
					<Text style={styles.left}>合约名称</Text>
					<Text style={styles.right}>{contractData.name}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>合约代码</Text>
					<Text style={styles.right}>{contractData.code}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>合约别名</Text>
					<Text style={styles.right}>{contractData.alias}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>合约类型</Text>
					<Text style={styles.right}>{contractData.type}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>币种</Text>
					<Text style={styles.right}>{contractData.currency}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>合约价值</Text>
					<Text style={styles.right}>{contractData.value}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>交易时间</Text>
					<Text style={styles.right}>{contractData.date}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>所在时区</Text>
					<Text style={styles.right}>{contractData.timeZone}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>最后交易日</Text>
					<Text style={styles.right}>{contractData.tradingDay}</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.left}>交易所规格</Text>
					<Text style={styles.right}>{contractData.specification}</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	itemWrap: {
		marginTop: 10,
		alignItems: 'center'
	},
	item: {
		flexDirection: 'row'
	},
	left: {
		width: 90,
		height: 29,
		lineHeight: 29,
		paddingLeft: 11,
		borderColor: '#424242',
		borderTopWidth: 0.5,
		borderRightWidth: 0.5,
		borderBottomWidth: 0.5,
		borderLeftWidth: 0.5,
		borderStyle: "solid",
		color: '#999'
	},
	right: {
		width: 260,
		height: 29,
		lineHeight: 29,
		paddingLeft: 11,
		borderColor: '#424242',
		borderTopWidth: 0.5,
		borderRightWidth: 0.5,
		borderBottomWidth: 0.5,
		borderStyle: "solid",
		color: '#fff'
	}
})

export default ContractInfo