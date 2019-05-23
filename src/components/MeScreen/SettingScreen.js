import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'

import Page from '../common/Page.js'
import MyBar from '../common/MyBar.js'

const minorTitle = {
  lineHeight: 19,
  color: '#E4E4E4',
  fontWeight: '500',
  fontStyle: 'normal',
	fontSize: 14
}

const minorWrap = {
  height: 38
}

const myBarData = [
	{
		title: '涨跌喜好',
		handler: '红跌绿涨',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2, marginTop: 10}},
		handlerColor: {color: '#fff'},
	},
	{
		title: '语言设置',
		handler: '简体中文',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		handlerColor: {color: '#fff'}
	},
	{
		title: '屏幕常亮',
		handler: true,
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 10}},
		whatElement: 'switch'
	},
	{
		title: '关于野牛',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		handleOption: '/About-BBN'
	}
]

class SettingScreen extends Component {
	pressHandle(params) {
		const { history } = this.props
		console.log(history)
		history.push(params)
	}
	render() {
		const option = {
			header: {
				title: '设置',
				goback: true,
				tips: '',
				more: ''
			},
			tabBar: {
				type: '',
				visible: false,
				footerVisible: true
			}
		}
		const myBar = myBarData.map((item, index) => {
			return (
				<MyBar 
					key={index}
					title={item.title}
					handler={item.handler}
					textStyle={item.textStyle}
					wrap={item.wrap}
					handlerColor={item.handlerColor}
					whatElement={item.whatElement}
					onPress={() => this.pressHandle(item.handleOption)}
				/>
			)
		})
		return (
			<Page
				header={option.header}
				tabBar={option.tabBar}
			>
				<ScrollView style={styles.main}>
					{ myBar }
				</ScrollView>
			</Page>
		)
	}
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

export default SettingScreen