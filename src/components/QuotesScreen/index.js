import React, { Component } from 'react'
import Page from '../common/Page.js'

class QuotesScreen extends Component {
  render() {
    const options = {
      header: {
        title: '行情',
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

export default QuotesScreen
