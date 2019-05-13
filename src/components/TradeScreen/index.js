import React, { Component } from 'react'
import Page from '../common/Page.js'

class TradeScreen extends Component {
  render() {
    const options = {
      header: {
        title: '交易',
        goback: false,
        tips: '',
        more: ''
      },
      tabBar: {
        type: '',
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

export default TradeScreen
