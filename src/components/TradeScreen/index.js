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

const tradeInfo = [
  {
    direction: '买升',
    value: '-150',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
  },
  {
    direction: '买升',
    value: '-150',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
  },
  {
    direction: '买跌',
    value: '-150',
    futureType: '国指期货1811(YM)',
    openPrice: '10599',
    sum: '1',
    maxStopLossPoint: '50',
    detail: {
      currentPL: '+17',
      handingFee: '30.00',
      margin: '5000.00',
      openingDate: '2018-11-06 17:41:20',
      validityPeriod: '当日有效',
      orderNum: 'A0000120509'
    }
  },
]

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
              <Text style={{color: "#999"}}>可用资金</Text>
              <Text style={{color: "#fff"}}>93,812.57</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={{color: "#999"}}>浮动盈亏</Text>
              <Text style={{color: "#BA403E"}}>-1,200.00</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={{color: "#999"}}>占用保证金</Text>
              <Text style={{color: "#fff"}}>6,187.43</Text>
            </View>
          </View>
          <Container style={styles.tabContainer}>
            <StyleProvider style={getTheme(material)}>
              <Tabs tabBarUnderlineStyle={{width: 55, height: 2, marginLeft: 35}}>
                <Tab heading={ <TabHeading><Text>持仓</Text></TabHeading>}>
                  { tradeInfo.map((item, index) => <CommonItem trade={item} key={index} />) }
                </Tab>
                <Tab heading={ <TabHeading><Text>已结算</Text></TabHeading>}>
                  <Text>Camera</Text>
                </Tab>
                <Tab heading={ <TabHeading><Text>触发单</Text></TabHeading>}>
                  <Text>Camera</Text>
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
    height: 40,
    backgroundColor: '#20212A'
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabContainer: {
    marginTop: 2
  }
})

export default TradeScreen
