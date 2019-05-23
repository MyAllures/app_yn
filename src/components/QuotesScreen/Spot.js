import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'

const propTypes = {
	spot: PropTypes.object
}

class Spot extends Component {
	
	render () {
		const { spot } = this.props
		return (
			<View style={styles.content}>
				<View style={styles.header}>
					<View style={styles.icon}></View>
					<Text style={styles.title}>{spot.title}</Text>
				</View>

				<View style={styles.main}>
					{
						spot.category.map((category, index) => {
							return (
								<View style={styles.itemWrap} key={index}>
									<View style={styles.titleWrap}>
										<Image source={category.icon} style={styles.img}/>
										<Text style={styles.categoryText}>{category.name}</Text>
									</View>
									<Text style={styles.categoryText}>{category.value1}</Text>
									<Text style={category.value2 > 0 ? {color: '#00CC00'} : (category.value2 == 0 ? {color: '#fff'} : {color: '#AB3333'})}>{category.value2}</Text>
									<Text style={category.value2 > 0 ? {color: '#00CC00'} : (category.value2 == 0 ? {color: '#fff'} : {color: '#AB3333'})}>{category.percent}</Text>
								</View>
							)
						})
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		marginBottom: 10
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#20212A',
		height: 38
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
	main: {
		marginTop: 2,
		backgroundColor: '#1B1B1B',
	},
	itemWrap: {
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#20212A',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 1,
		paddingLeft: 10,
		paddingRight: 10
	},
	titleWrap: {
		width: 120,
		flexDirection: 'row',
		alignItems: 'center'
	},
	img: {
		width: 24,
		height: 24,
		marginRight: 4
	},
	categoryText: {
		color: '#fff'
	}
})

export default Spot