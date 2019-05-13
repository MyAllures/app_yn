import React, { Component } from 'React'
import { 
	StyleSheet, 
	ScrollView, 
	Text, 
	View,
	Image } from 'react-native'
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
		title: '版本更新',
		handler: '更新版本为2.1',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2, marginTop: 10}},
	},
	{
		title: '用户协议',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
	},
	{
		title: '免责声明',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
	},
	{
		title: '服务条款',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}}
	}
]

class AboutBBNScreen extends Component {
	pressHandle(params) {
		const { history } = this.props
		history.push(params)
	}
	render() {
		const option = {
			header: {
				title: '关于野牛',
				goback: true,
				tips: '',
				more: ''
			},
			tabBar: {
				type: '',
				visible: false
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
					<View style={ styles.logoBox }>
						<Image 
							source={require('../../assets/icon-avatar.png')}
							style={styles.logo}>
						</Image>
						<Text style={styles.text}>野牛期货</Text>
						<Text style={styles.text}>2.1.0</Text>
					</View>
					{ myBar }
				</ScrollView>
			</Page>
				
			
		)
	}
}

const styles = StyleSheet.create({
	logoBox: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
    marginBottom: 30,
	},
	logo: {
    width: 100,
    height: 100,
    marginBottom: 10
	},
	text: {
		color: '#E4E4E4',
		fontSize: 14
	},
  main: {
    flex: 1
  },
})

export default AboutBBNScreen