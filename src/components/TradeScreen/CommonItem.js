import  React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

const propTypes = {
	trade: PropTypes.object
}

class CommonItem extends Component {
	constructor() {
    super()
    this.state = { 
			isVisible: false,
			icon: require('../../assets/icon-arrow-4.png'),
		}
	}
	
	pressHandle () {
		if (!this.state.isVisible) {
			this.setState(
				{ 
					isVisible: true,
					icon: require('../../assets/icon-arrow-3.png')
				}
			)
		} else {
			this.setState(
				{ 
					isVisible: false,
					icon: require('../../assets/icon-arrow-4.png')
				}
			)
		}
		 
	}

  render () {
		const { trade } = this.props
		let tradeDetail
		if (this.state.isVisible) {
			tradeDetail =  ( 
			<View>
				<View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#282828'}}>
					<View style={{flex: 1 }}>
						<Text style={{textAlign: 'right', color: '#999'}}>当前盈亏点数：</Text>
					</View>
					<View style={{flex: 1}}>
						<Text style={{color: '#fff'}}>{trade.detail.currentPL}</Text>
					</View>
				</View> 

				<View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#1B1B1B'}}>
					<View style={{flex: 1}}>
						<Text style={{textAlign: 'right', color: '#999'}}>手续费：</Text>
					</View>
					<View style={{flex: 1}}>
						<Text style={{color: '#fff'}}>{trade.detail.handingFee}</Text>
					</View>
				</View> 

				<View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#282828'}}>
					<View style={{flex: 1 }}>
						<Text style={{textAlign: 'right', color: '#999'}}>保证金：</Text>
					</View>
					<View style={{flex: 1}}>
						<Text style={{color: '#fff'}}>{trade.detail.margin}</Text>
					</View>
				</View> 
				
				<View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#1B1B1B'}}>
					<View style={{flex: 1}}>
						<Text style={{textAlign: 'right', color: '#999'}}>建仓时间：</Text>
					</View>
					<View style={{flex: 1}}>
						<Text style={{color: '#fff'}}>{trade.detail.openingDate}</Text>
					</View>
				</View> 

				<View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#282828'}}>
					<View style={{flex: 1 }}>
						<Text style={{textAlign: 'right', color: '#999'}}>有效期：</Text>
					</View>
					<View style={{flex: 1}}>
						<Text style={{color: '#fff'}}>{trade.detail.validityPeriod}</Text>
					</View>
				</View> 
				
				<View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#1B1B1B'}}>
					<View style={{flex: 1}}>
						<Text style={{textAlign: 'right', color: '#999'}}>订单号：</Text>
					</View>
					<View style={{flex: 1}}>
						<Text style={{color: '#fff'}}>{trade.detail.orderNum}</Text>
					</View>
				</View> 
			</View>
			)
		}
		return (
			<View style={styles.content}>
				<View style={styles.wrap}>
					<View style={styles.left}>
						<Text>{ trade.direction }</Text>
						<Text>{ trade.value }</Text>
						<Text>{ trade.futureType }</Text>
					</View>
					<View style={styles.middle}>
						<View style={styles.imgWrap}>
							<Image 
								source={require('../../assets/icon-trade-0.png')}
								style={styles.img}
							/>
							<View>
								<Text>建仓价</Text>
								<Text>{ trade.openPrice }</Text>
							</View>
						</View>

						<View style={styles.imgWrap}>
							<Image 
								source={require('../../assets/icon-trade-0.png')}
								style={styles.img}
							/>
							<View>
								<Text>手数</Text>
								<Text>{ trade.sum }</Text>
							</View>
						</View>

						<View style={styles.imgWrap}>
							<Image 
								source={require('../../assets/icon-trade-0.png')}
								style={styles.img}
							/>
							<View>
								<Text>最大止损点</Text>
								<Text>{ trade.maxStopLossPoint }</Text>
							</View>
						</View>
					</View>

					<TouchableOpacity style={styles.right} onPress={() => this.pressHandle()}>
						<Image 
							source={this.state.icon}
							style={styles.img}
						/>
					</TouchableOpacity>
				</View>

				{ tradeDetail }

			</View>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: '#20212A',
		marginBottom: 3
	},
	wrap: {
		height: 120,
		flexDirection: 'row',
		justifyContent: 'space-around',	
	},
	left: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginRight: 30
	},
	middle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	right: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	imgWrap: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	img: {
		width: 24,
		height: 24,
		marginRight: 8
	}
})

export default CommonItem