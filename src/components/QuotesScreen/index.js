import React, { Component } from 'react'
import Page from '../common/Page.js'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, StyleProvider, Text } from 'native-base'

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
        <ScrollView style={styles.main}>

        </ScrollView>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1B1B1B'
  }
})

export default QuotesScreen
