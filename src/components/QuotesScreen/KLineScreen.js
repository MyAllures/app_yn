import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Page from '../common/Page.js'

class KLineScreen extends Component {
  render () {
		const options = {
      header: {
        title: '道琼指数',
        goback: true,
        tips: '',
        more: ''
      },
      tabBar: {                                                                                                                                                                                                                                                                                                                    
        type: 'KLine',
        visible: true
      }
    }
		return (
			<Page
				header={options.header}
				tabBar={options.tabBar}>

			</Page>
		)
	}
}

export default KLineScreen