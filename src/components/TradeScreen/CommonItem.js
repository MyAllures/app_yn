import React, { Component } from "react"
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base"
import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native'

import AlertAndroid from '../common/AlertAndroid' // 封装好的仿IOS的 alert组件

const tradeInfo = [
  {
    direction: '买升',
    value: '-150',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
  },
  {
    direction: '买升',
    value: '-150',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
  },
  {
    direction: '买跌',
    value: '70',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
	},
	{
    direction: '买跌',
    value: '70',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
	},
	{
    direction: '买跌',
    value: '70',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
  },
]

export default class CommonItem extends Component {

	// constructor(props) {
  //   super(props);

  //   this._closeAllPosition = this._closeAllPosition.bind(this);
  // }

	_closeAllPosition() {
		console.log(111)
	}

  _renderHeader(trade, expanded) {
    return (
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<Text style={{color: trade.direction === '买升' ? '#00CC00' : '#CC3333'}}>{ trade.direction }</Text>
					<Text style={{color: trade.value > 0 ? '#00CC00' : '#CC3333'}}>{ trade.value }</Text>
					<Text style={{color: '#fff'}}>{ trade.futureType }</Text>
				</View>
				<View style={styles.headerMiddle}>
					<View style={styles.middleItem}>
						<Image 
							source={require('../../assets/icon-trade-0.png')}
							style={styles.itemImg}
						/>
						<View>
							<Text style={styles.headerTitle}>建仓价</Text>
							<Text style={styles.headerValue}>{ trade.openPrice }</Text>
						</View>
					</View>

					<View style={styles.middleItem}>
						<Image 
							source={require('../../assets/icon-trade-0.png')}
							style={styles.itemImg}
						/>
						<View>
							<Text style={styles.headerTitle}>手数</Text>
							<Text style={styles.headerValue}>{ trade.sum }</Text>
						</View>
					</View>

					<View style={styles.middleItem}>
						<Image 
							source={require('../../assets/icon-trade-0.png')}
							style={styles.itemImg}
						/>
						<View >
							<Text style={styles.headerTitle}>最大止损点</Text>
							<Text style={styles.headerValue}>{ trade.maxStopLossPoint }</Text>
						</View>
					</View>
				</View>

				<View style={styles.headerRight}>
					{ expanded ? <Image source={require('../../assets/icon-arrow-4.png')} style={styles.arrow} />
										 : <Image source={require('../../assets/icon-arrow-3.png')} style={styles.arrow} /> }
				</View>
			</View>
    )
	}
	
  _renderContent(trade) {
    return (
			<View>
				<View style={styles.contentEvenItem}>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentTitle}>当前盈亏点数：</Text>
					</View>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentValue}>{trade.detail.currentPL}</Text>
					</View>
				</View> 

				<View style={styles.contentOddItem}>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentTitle}>手续费：</Text>
					</View>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentValue}>{trade.detail.handingFee}</Text>
					</View>
				</View>  

				<View style={styles.contentEvenItem}>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentTitle}>保证金：</Text>
					</View>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentValue}>{trade.detail.margin}</Text>
					</View>
				</View> 
				
				<View style={styles.contentOddItem}>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentTitle}>建仓时间：</Text>
					</View>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentValue}>{trade.detail.openingDate}</Text>
					</View>
				</View> 

				<View style={styles.contentEvenItem}>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentTitle}>有效期：</Text>
					</View>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentValue}>{trade.detail.validityPeriod}</Text>
					</View>
				</View> 
				
				<View style={styles.contentOddItem}>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentTitle}>订单号：</Text>
					</View>
					<View style={styles.contentItemHalf}>
						<Text style={styles.contentValue}>{trade.detail.orderNum}</Text>
					</View>
				</View> 

				<TouchableOpacity style={styles.positionItem} touchableHandlePress={ () => this._closeAllPosition }>
					<Text style={styles.positionText}>全部平仓 10617</Text>
				</TouchableOpacity>
			</View>
    )
	}
	
  render() {
		const alertAndroid = <AlertAndroid ref="alertAndroid" />
    return (
      <Container>
				<Accordion
					style={{ backgroundColor: "#1B1B1B" }}
					dataArray={tradeInfo}
					animation={true}
					expanded={true}
					renderHeader={this._renderHeader}
					renderContent={this._renderContent}
					
				/>
				{alertAndroid}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
	header: {
		height: 130,
		flexDirection: 'row',
		justifyContent: 'space-around',	
		backgroundColor: '#20212A',
		marginTop: 2
	},
	headerLeft: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginRight: 30
	},
	headerMiddle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	headerRight: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	middleItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemImg: {
		width: 28,
		height: 28,
		marginRight: 8
	},
	arrow: {
		width: 20,
		height: 20,
		marginRight: 12
	},
	headerTitle: {
		color: '#999',
		fontSize: 15
	},
	headerValue: {
		color: '#fff',
		fontSize: 15
	},
	contentEvenItem: {
		flexDirection: 'row', 
		alignItems: 'center', 
		height: 30, 
		backgroundColor: '#282828'
	},
	contentOddItem: {
		flexDirection: 'row', 
		alignItems: 'center', 
		height: 30, 
		backgroundColor: '#1B1B1B'
	},
	contentItemHalf: {
		flex: 1
	},
	contentTitle: {
		textAlign: 'right', 
		color: '#999',
		fontSize: 15
	},
	contentValue: {
		color: '#fff',
		fontSize: 15
	},
	positionItem: {
		justifyContent: 'center',
		alignItems: 'center', 
		height: 40, 
		backgroundColor: '#BA403E'
	},
	positionText: {
		color: '#fff'
	}
})
