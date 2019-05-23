import React, { Component } from 'react'
import { 
  ScrollView,
  View,
  StyleSheet
 } from 'react-native'
 import { Container, Header, Tab, Tabs, TabHeading, StyleProvider, Text } from 'native-base'
 
import Page from '../common/Page.js'
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material'
import CommonItem from './CommonItem'

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
        <ScrollView style={styles.main}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.textTitle}>可用资金</Text>
              <Text style={styles.textValue}>93,812.57</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.textTitle}>浮动盈亏</Text>
              <Text style={styles.textValue}>-1,200.00</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.textTitle}>占用保证金</Text>
              <Text style={styles.textValue}>6,187.43</Text>
            </View>
          </View>
          <Container style={styles.tabContainer}>
            <StyleProvider style={getTheme(material)}>
              <Tabs tabBarUnderlineStyle={{width: 55, height: 2, marginLeft: 35}}>
                <Tab heading={ <TabHeading><Text>持仓</Text></TabHeading>}>
                  <CommonItem />
                </Tab>
                <Tab heading={ <TabHeading><Text>已结算</Text></TabHeading>}>
                  <CommonItem />
                </Tab>
                <Tab heading={ <TabHeading><Text>触发单</Text></TabHeading>}>
                  <CommonItem />
                </Tab>
              </Tabs>
            </StyleProvider>
          </Container>
        </ScrollView>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1B1B1B'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#20212A',
    paddingTop: 10,
    paddingBottom: 10
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    color: '#999',
    fontSize: 15
  },
  textValue: {
    color: '#fff',
    fontSize: 15
  },
  tabContainer: {
    marginTop: 2
  }
})

export default TradeScreen
