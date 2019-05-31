import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base"
import PropTypes from 'prop-types'

const futuresData = [
	{
		title: 'A50指数',
		symbol: 'SG',
		en: 'CN182',
		volume: '11480.0',
		percent: '-1.86%'
	},
	{
		title: 'A50指数',
		symbol: 'SG',
		en: 'CN182',
		volume: '11480.0',
		percent: '-1.86%'
	},
	{
		title: 'A50指数',
		symbol: 'SG',
		en: 'CN182',
		volume: '11480.0',
		percent: '-1.86%'
	},
]

class MarketRelated extends Component {
	render () {
		return (
			futuresData.map((futures, index) => {
				return (
					<TouchableOpacity style={styles.item} key={index}>

						<View style={styles.left}>
							<View style={styles.leftHeader}>
								<View style={styles.symbolBg}>
									<Text style={styles.symbolText}>{futures.symbol}</Text>
								</View>
								<Text style={styles.title}>{futures.title}</Text>
							</View>
							<Text style={styles.en}>{futures.en}</Text>
						</View>

						<View style={styles.middle}>
							<Text style={{color: '#fff'}}>{futures.volume}</Text>
						</View>

						<View style={styles.right}>
							<Text style={futures.percent > 0 ? {color: '#00CC00'} : (futures.percent == 0 ? {color: '#fff'} : {color: '#AB3333'})}>{futures.percent}</Text>
						</View>

					</TouchableOpacity>
					
				)
			})
		)
	}
}

const styles = StyleSheet.create({
	item: {
		height: 50,
		backgroundColor: '#20212A',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 1
	},
	left: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	middle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	right: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	leftHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	symbolBg: {
		width: 24,
		height: 16,
		backgroundColor: '#69151A',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 6,
	},
	symbolText: {
		color: '#fff'
	},
	title: {
		color: '#fff',
	},
	en: {
		color: '#fff',
		fontSize: 12
	}
})

export default MarketRelated