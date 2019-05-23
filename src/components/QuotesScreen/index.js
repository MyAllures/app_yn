import React, { Component } from 'react'
import Page from '../common/Page.js'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, StyleProvider, Text } from 'native-base'
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material'
import CommonItem from './CommonItem'
import Spot from './Spot'

const contractData = [
  {
    title: '股指期货',
    path: '/Stock-Futures',
    exponent: [
      {
        name: 'A50指数',
        value: '11445.0',
        pl: '-220.0',
        percent: '-1.89%'
      },
      {
        name: '恒生指数',
        value: '25867',
        pl: '-626',
        percent: '-2.36%'
      },
      {
        name: 'SP500指数',
        value: '2718.2',
        pl: '4.25',
        percent: '0.16%'
      },
      {
        name: 'SP500指数',
        value: '2718.2',
        pl: '4.25',
        percent: '0.16%'
      },
      {
        name: 'A50指数',
        value: '11445.0',
        pl: '-220.0',
        percent: '-1.89%'
      },
      {
        name: '恒生指数',
        value: '25867',
        pl: '0',
        percent: '0.00%'
      },
    ]
  },
  {
    title: '能源化工',
    exponent: [
      {
        name: 'A50指数',
        value: '11445.0',
        pl: '-220.0',
        percent: '-1.89%'
      },
      {
        name: 'SP500指数',
        value: '2718.2',
        pl: '4.25',
        percent: '0.16%'
      },
      {
        name: '恒生指数',
        value: '25867',
        pl: '-626',
        percent: '-2.36%'
      },
    ]
  },
  {
    title: '贵金属',
    exponent: [
      {
        name: 'A50指数',
        value: '11445.0',
        pl: '-220.0',
        percent: '-1.89%'
      },
      {
        name: '恒生指数',
        value: '25867',
        pl: '-626',
        percent: '-2.36%'
      },
      {
        name: 'SP500指数',
        value: '2718.2',
        pl: '4.25',
        percent: '0.16%'
      },
    ]
  },
]

const spotData = [
  {
    title: '大宗商品',
    category: [
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货布朗特原油',
        value1: '71.23',
        value2: '0.00',
        percent: '+0.00%'
      },
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货黄金',
        value1: '1233.43',
        value2: '-0.78',
        percent: '-0.06%'
      },
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货白银',
        value1: '71.23',
        value2: '0.00',
        percent: '+0.00'
      },
    ]
  },
  {
    title: '外汇',
    category: [
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货在岸人民币',
        value1: '71.23',
        value2: '0.00',
        percent: '+0.00%'
      },
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货离岸人民币',
        value1: '1233.43',
        value2: '0.78',
        percent: '-0.06%'
      },
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货欧元',
        value1: '71.23',
        value2: '0.89',
        percent: '+0.00'
      },
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货日元',
        value1: '1233.43',
        value2: '-0.78',
        percent: '-0.06%'
      },
      {
        icon: require('../../assets/icon-trade-0.png'),
        name: '现货英镑',
        value1: '71.23',
        value2: '0.00',
        percent: '+0.00'
      },
    ]
  },
]

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
          <Container style={styles.tabContainer}>
            <StyleProvider style={getTheme(material)}>
              <Tabs tabBarUnderlineStyle={{width: 55, height: 2, marginLeft: 35}}>
                <Tab heading={ <TabHeading><Text>合约种类</Text></TabHeading>}>
                  {
                    contractData.map((contract, index) => {
                      return <CommonItem contract={contract} key={index} history={this.props.history}/>
                    })
                  }
                </Tab>
                <Tab heading={ <TabHeading><Text>交易所</Text></TabHeading>}>
                  {
                    contractData.map((contract, index) => {
                      return <CommonItem contract={contract} key={index}/>
                    })
                  }
                </Tab>
                <Tab heading={ <TabHeading><Text>现货</Text></TabHeading>}>
                  {
                    spotData.map((spot, index) => {
                      return <Spot spot={spot} key={index}/> 
                    })
                  }
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
  }
})

export default QuotesScreen
