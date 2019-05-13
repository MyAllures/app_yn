import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

class Footer extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerTxt}>
          野牛期货 | 版权所有
        </Text>
        <Text style={styles.footerTxt}>
          ©2018 BBN Futures . All Rights Reserved.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#1b1b1b'
  },
  footerTxt: {
    textAlign: 'center',
    lineHeight: 14,
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
    color: '#9999997c'
  }
})

export default Footer
