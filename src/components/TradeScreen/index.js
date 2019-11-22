import React, { Component } from 'react'
import { 
  ScrollView,
  View,
  StyleSheet
 } from 'react-native'
import { 
  Container, 
  Header, 
  Tab, 
  Tabs, 
  TabHeading, 
  StyleProvider, 
  Text } from 'native-base'

import { connect } from 'react-redux'
import * as types from '../../action/index'
import * as url from '../../constants/Url'
 
import Page from '../common/Page.js'
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material'
import CommonItem from './CommonItem'

class TradeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      accountBalance: {}
    }
  }
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
    const accountBalance = this.props.balance

    return (
      <Page
        header={options.header}
        tabBar={options.tabBar}>
        <ScrollView style={styles.main}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.textTitle}>可用资金</Text>
              <Text style={styles.textValue}>{Number(accountBalance.available).toFixed(2)}</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.textTitle}>浮动盈亏</Text>
              <Text style={styles.textValue}>{Number(accountBalance.profitAndLoss).toFixed(2)}</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.textTitle}>占用保证金</Text>
              <Text style={styles.textValue}>{Number(accountBalance.totalMargin).toFixed(2)}</Text>
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

  getAccountBalance () {
    const {getAccountBalance} = this.props
    getAccountBalance()
  }

  getUnsettledOrders () {
    fetch(url.UNSETTLED_ORDERS)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(res => {
        console.log('[持仓订单列表]', res)
      })
  }

  componentDidMount () {
    this.getAccountBalance()
    this.getUnsettledOrders()
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

const mapDispatchToProps = dispatch => {
  return {
    getAccountBalance: () => dispatch(types.accountBalance)
  }
}

const mapStateToProps = state => {
  return {
    balance: state.account.accountBalance
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeScreen)
