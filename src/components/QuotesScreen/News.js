import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const newsData = [
	{
		content: '“黑暗10月”全球股市蒸发了8万亿美元！你的账户还好吗？',
		date: '2018-11-05 18：20'
	},
	{
		content: '“黑暗10月”全球股市蒸发了8万亿美元！你的账户还好吗？',
		date: '2018-11-05 18：20'
	},
	{
		content: '“黑暗10月”全球股市蒸发了8万亿美元！你的账户还好吗？',
		date: '2018-11-05 18：20'
	},
]

class News extends Component {
  render () {
		return (
			<View>
				{
					newsData.map((news, index) => {
						return (
							<TouchableOpacity style={styles.itemWrap} key={index}>
								<Text style={styles.content}>{news.content}</Text>
								<Text style={styles.date}>{news.date}</Text>
							</TouchableOpacity>
						)
					})
					
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	itemWrap: {
		height: 52,
		backgroundColor: '#20212A',
		justifyContent: 'center',
		marginBottom: 1,
		paddingLeft: 5
	},
	content: {
		color: '#fff'
	},
	date: {
		color: '#999',
		fontSize: 12,
		marginTop: 3
	}
})

export default News