import React, { Component } from 'react'
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  View
} from 'react-native'

import Header from './Header.js'
import Footer from './Footer.js'
import TabBar from './TabBar.js'

class Page extends Component {
  render() {
    const { header, children, tabBar } = this.props
    let headerContext = (<Header {...header}></Header>)
    let footerContext = (<Footer></Footer>)
    let context = (
      <View style={styles.container}>
        { header.hidden ? null : headerContext }
        <View style={styles.body}>
          {children}
        </View>
        {/* { tabBar.visible ? (<TabBar type={tabBar.type}/>) : footerContext } */}
        { tabBar.visible ? (<TabBar type={tabBar.type}/>) : (tabBar.footerVisible ? footerContext : null) }
      </View>
    )
    return context
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0
  },
  body: {
    flex: 1,
    backgroundColor: '#1b1b1b'
  }
})

export default Page
