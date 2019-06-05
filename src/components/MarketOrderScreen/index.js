import React, { Component } from 'react'
import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	CheckBox,
	Text
} from 'react-native'

import Page from  '../common/Page.js'


class MarketOrder extends Component {
	constructor () {
		super()
		this.state = {
			isChecked: true
		}
	}

	valueChange() {
		this.setState({
			isChecked: !this.state.isChecked
		})
	}
	render () {
		const options = {
      header: {
        title: '创建市价单',
        goback: true,
        tips: '',
        more: ''
      },
      tabBar: {
        type: '',
        visible: false
      }
    }
		return (
			<Page
				header={options.header}
				tabBar={options.tabBar}>
				<ScrollView>
					<View style={styles.top}>
						<TouchableOpacity style={styles.topLeft}>
							<CheckBox style={{position: 'absolute', top: 0, left:0}} value={this.state.isChecked} onValueChange={() => this.valueChange()} />
							<Text style={{color: '#fff', fontSize: 18}}>2718.35</Text>
							<Text style={{color: '#fff', fontSize: 18}}>看升</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.topRight}>
							<CheckBox style={{position: 'absolute', top: 0, left:0}} value={this.state.isChecked} onValueChange={() => this.valueChange()}/>
							<Text style={{color: '#fff', fontSize: 18}}>2718.35</Text>
							<Text style={{color: '#fff', fontSize: 18}}>点击切换</Text>
						</TouchableOpacity>
					</View>

					<View >
						<Text>1111</Text>
					</View>
				</ScrollView>
			</Page>

		)
	}
}

const styles = StyleSheet.create({
	top: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 15
	},
	topLeft: {
		backgroundColor: '#216D2F',
		width: 167,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center'
	},
	topRight: {
		backgroundColor: '#4C232C',
		width: 167,
		height: 60,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default MarketOrder