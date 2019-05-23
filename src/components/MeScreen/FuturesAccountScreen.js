import React, { Component } from 'React'
import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'
import Page from '../common/Page.js'
import MyBar from '../common/MyBar.js'
import MyButton from '../common/MyButton.js'
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
		title: '可用资金',
		handler: '93,812.57',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2, marginTop: 10}},
		whatElement: 'text'
	},
	{
		title: '浮动盈亏',
		handler: '-1,200.00',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		whatElement: 'text'
	},
	{
		title: '占用保证金',
		handler: '6,187.43',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 10}},
		whatElement: 'text'
	},
	{
		title: '交易订单历史',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}}
	},
	{
		title: '资金往来记录',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 10}},
	},
	{
		title: '如何入金？',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}}
	}
]

class FuturesAccount extends Component {
	pressHandle(params) {
		const { history } = this.props
		history.push(params)
	}

	render() {
		const option = {
			header: {
				title: '期货账户',
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
					<View style={styles.wrap}>
						<MyButton							
							wrapCss={{
								height: 45
							}}
							textCss={{
								fontFamily: '微软雅黑',
								fontWeight: '400',
								fontStyle: 'normal',
								fontSize: 16,
								color: '#ffffff'
							}}
							value={'申请出金'}
							defineColors={['#ba403e', '#ba403e', '#ba403e']}
							defineRadius={2}
						/>
					</View>
				</ScrollView>
			</Page>
		)
	}
}

const styles = StyleSheet.create({
  main: {
    flex: 1
	},
	wrap: {
    paddingLeft: 41,
		paddingRight: 41,
		marginTop: 35
  },
})

export default FuturesAccount