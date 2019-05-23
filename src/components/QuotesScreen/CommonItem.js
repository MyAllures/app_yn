import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const propTypes = {
	contract: PropTypes.object
}

class CommonItem extends Component {
	render () {
		const {contract} = this.props
		return (
			<View style={styles.content}>
				<TouchableOpacity style={styles.header}>
					<View style={styles.headerLeft}>
						<View style={styles.icon}></View>
						<Text style={styles.title}>{contract.title}</Text>
					</View>
					<View style={styles.headerRight}>
						<Text style={styles.more}>更多</Text>
						<Image 
							source={require('../../assets/icon-arrow-2.png')}
							style={styles.img}
						/>
					</View>
				</TouchableOpacity>
				<View style={styles.main}>
					{
						contract.exponent.map((exponent, index) => {
							return  <LinearGradient
												key={index}
												start={{x: 0.25, y: 0.25}}
    										end={{x: 0.75, y: 0.75}}
												locations={[ 0.4, 0.5, 0.6 ]}
												colors={exponent.pl > 0 ? ['#00CC00', '#069900', '#009900'] : (exponent.pl == 0 ? ['#C9C9C9', '#A1A1A1', '#A1A1A1'] : ['#791924', '#67161F', '#67161F']) }
												style={styles.linearGradient}>
												<Text style={styles.exponentText}>{exponent.name}</Text>
												<Text style={styles.exponentText}>{exponent.value}</Text>
												<View style={{flexDirection: 'row'}}>
													<Text style={styles.exponentText}>{exponent.pl}</Text>
													<Text style={[styles.exponentText, {marginLeft: 8}]}>{exponent.percent}</Text>
												</View>
											</LinearGradient>
						})
					}
					
				</View>
				
			</View>
			
		)
	}
}

const styles = StyleSheet.create({
	content: {
		marginBottom: 8
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10,
		backgroundColor: '#20212A',
		height: 38
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center'
	},	
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		width: 3,
		height: 23,
		marginRight: 4,
		backgroundColor: '#BA403E'
	},
	title: {
		color: '#999',
		fontSize: 15
	},
	more: {
		color: '#999',
		fontSize: 13
	},
	img: {
		width: 14,
		height: 14
	},
	main: {
		marginTop: 2,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#20212A',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	linearGradient: {
		width: 110,
		height: 72,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	exponentText: {
		color: '#fff'
	}

})

export default CommonItem