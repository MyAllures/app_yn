import React, {Component} from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import Page from '../common/Page.js'
import More from './More.js'

class StockFuturesScreen extends Component {
	render () {
		const option = {
			header: {
				title: '股指期货',
				goback: true,
				tips: '',
				more: ''
			},
			tabBar: {
				type: '',
				visible: false,
				footerVisible: false
			}
		}
		return (
			<Page
				header={option.header}
				tabBar={option.tabBar}
			>
				<ScrollView style={styles.main}>
					<More history={this.props.history}/>
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

export default StockFuturesScreen