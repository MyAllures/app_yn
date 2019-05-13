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
		title: '手机号',
		handler: '1882****356',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2, marginTop: 10}},
		whatElement: 'text'
	},
	{
		title: '数字账号',
		handler: '884201',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		whatElement: 'text'
	},
	{
		title: '昵称',
		handler: '涨停小助手',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		whatElement: 'text'
	},
	{
		title: '注册时间',
		handler: '2018-08-08 19:30:56',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 10}},
		whatElement: 'text'
	},
	{
		title: '真实姓名',
		handler: '李**',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		whatElement: 'text'
	},
	{
		title: '身份证号码',
		handler: '441481*******15',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 10}},
		whatElement: 'text'
	},
	{
		title: '银行卡号',
		handler: '420*********52',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		whatElement: 'text'
	},
	{
		title: '银行名称',
		handler: '浦发银行',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		whatElement: 'text'
	},
	{
		title: '银行地址',
		handler: '2018-08-08 19:30:56',
		textStyle: minorTitle,
		wrap: {...minorWrap, ...{marginBottom: 2}},
		whatElement: '浦发银行西丽支行'
	},

]

class AccountInfo extends Component {
	pressHandle(params) {
		const { history } = this.props
		history.push(params)
	}

	render() {
		const option = {
			header: {
				title: '账户详情',
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
							value={'退出登录'}
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
  }
})

export default AccountInfo