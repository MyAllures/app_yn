import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base"

const futuresData = [
	{
		title: 'A50指数',
		symbol: 'SG',
		info: [
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '1887.5',
				rfPercent: '2.6%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '17.5',
				rfPercent: '1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '17.5',
				rfPercent: '1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			}
		]
	},
	{
		title: 'A50指数',
		symbol: 'SG',
		info: [
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			}
		]
	},
	{
		title: 'A50指数',
		symbol: 'SG',
		info: [
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '17.5',
				rfPercent: '1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			}
		]
	},
	{
		title: 'A50指数',
		symbol: 'SG',
		info: [
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			},
			{
				category: 'A50指数主联',
				en: 'CNmain',
				latestPrice: '11447.5',
				volume: '123622',
				rf: '-217.5',
				rfPercent: '-1.86%'
			}
		]
	},
]

class More extends Component {
	_renderHeader (futures, expanded) {
		return (
			<View style={styles.header}>
				{ expanded ? <Image source={require('../../assets/icon-arrow-4.png')} style={styles.arrow} />
									 : <Image source={require('../../assets/icon-arrow-3.png')} style={styles.arrow} />
				}
				<View style={styles.symbolBg}>
					<Text style={styles.title}>{futures.symbol}</Text>
				</View>
				<Text style={styles.title}>{futures.title}</Text>
			</View>
		)
	}

	_renderContent (future) {
		return (
			<View style={styles.content}>
				<View style={styles.contentHeader}>
					<View style={{justifyContent: 'center', alignItems: 'center', flex: 3}}><Text style={styles.contentTitle}>合约名称/代码</Text></View>
					<View style={{justifyContent: 'center', alignItems: 'center', flex: 2}}><Text style={styles.contentTitle}>最新价/成交量</Text></View>
					<View style={{justifyContent: 'center', alignItems: 'center', flex: 2}}><Text style={styles.contentTitle}>涨跌额/涨跌幅</Text></View>
				</View>
				{
					future.info.map((info, index) => {
						return (
							<View style={styles.contentBody} key={index}>
								<View style={styles.bodyLeft}>
									<View style={styles.categoryWrap}>
										<View style={styles.symbolBg}>
											<Text style={styles.contentTopText}>{future.symbol}</Text>
										</View>
										<Text style={styles.contentTopText}>{info.category}</Text>
									</View>
									<Text style={styles.contentBottomText}>{info.en}</Text>
								</View>
								
								<View style={styles.bodyMiddle}>
									<Text style={styles.contentTopText}>{info.latestPrice}</Text>
									<Text style={styles.contentBottomText}>{info.volume}</Text>
								</View>

								<View style={styles.bodyRight}>
									<Text style={info.rf > 0 ? {color: '#00CC00'} : (info.rf == 0 ? {color: '#fff'} : {color: '#AB3333'})}>{info.rf}</Text>
									<Text style={info.rf > 0 ? {color: '#00CC00'} : (info.rf == 0 ? {color: '#fff'} : {color: '#AB3333'})}>{info.rfPercent}</Text>
								</View>
							</View>
						)
					})
				}
				
			</View>
		)
	}

	render () {
		return (
			<Container style={{marginTop: 6}}>
				<Accordion
					style={{ backgroundColor: "#1B1B1B" }}
					dataArray={futuresData}
					animation={true}
					expanded={true}
					renderHeader={this._renderHeader}
					renderContent={this._renderContent}
				/>
      </Container>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		height: 38,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#20212A',
		paddingLeft: 10,
		marginBottom: 2
	},
	arrow: {
		width: 18,
		height: 18,
		marginRight: 12,
		
	},
	symbolBg: {
		width: 24,
		height: 16,
		backgroundColor: '#69151A',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 6,
	},
	title: {
		fontSize: 15,
		color: '#fff'
	},
	content: {
		backgroundColor: '#1B1B1B'
	},
	contentHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 27,
		marginBottom: 1,
		backgroundColor: '#20212A'
	},
	contentTitle: {
		color: '#999',
		fontSize: 12
	},
	contentBody: {
		backgroundColor: '#2F2F3A',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 1
	},
	contentTopText: {
		fontSize: 15,
		color: '#fff'
	},
	contentBottomText: {
		fontSize: 12,
		color: '#fff'
	},	
	bodyLeft: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	categoryWrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	bodyMiddle: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bodyRight: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
})

export default  More