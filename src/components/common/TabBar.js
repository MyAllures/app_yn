import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-native'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'

const titles = [
  {
    icon: 'quotes',
    title: '行情',
    to: '/Quotes',
    img: require('../../assets/icon-quotes-0.png'),
    active: require('../../assets/icon-quotes.png')
  },
  {
    icon: 'trade',
    title: '交易',
    to: '/Trade',
    img: require('../../assets/icon-trade-0.png'),
    active: require('../../assets/icon-trade.png')
  },
  {
    icon: 'account',
    title: '我的',
    to: '/Me',
    img: require('../../assets/icon-account-0.png'),
    active: require('../../assets/icon-account.png')
  }
]

const dynamicTitles = [
  {
    icon: 'phone',
    title: '咨询',
    to: '/Advisory',
    img: require('../../assets/icon-advisory-0.png'),
    active: require('../../assets/icon-advisory.png')
  }
]

class TabBar extends Component {
  titleData() {
    const { type } = this.props
    const ret = [].concat(titles)
    switch (type) {
      case 'Advisory':
        ret.push(dynamicTitles[0])
        break
      default:
        break
    }
    return ret
  }
  imgSize(size) {
    return {
      width: size,
      height: size
    }
  }
  listRender(titles) {
    const iconSize = 24
    const iconColor = '#666666'
    const { type, location } = this.props
    return titles.map((item, index) => {
      const host = item.to
      const pathName = location.pathname

      let curColor = iconColor
      let curImg = item.img
      if (pathName.indexOf(host) === 0 || (host === '/Me' && pathName === '/')) {
        curColor = '#ba403e'
        curImg = item.active
      }
      return (
        <Link 
          to={item.to}
          // component={TouchableOpacity}
          style={[styles.tabItem]} 
          key={index}>
          <View style={[styles.tabItem]}>
            <View style={styles.bg}></View>
            <Image
              source={curImg}
              style={[
                {marginBottom: 3},
                this.imgSize(iconSize)
              ]} />
            <Text style={[styles.title, {color: curColor}]}>
              {item.title}
            </Text>
          </View>
        </Link>
      )
    })
  }
  render() {
    const titles = this.titleData()
    const listItem = this.listRender(titles)
    return (
      <View style={[styles.tabBar]}>
        {listItem}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 56,
    overflow: 'hidden',
    borderTopWidth: 2,
    borderTopColor: '#333333'
  },
  tabItem: {
    flex: 1,
    marginTop: -5,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#666'
  },
  actived: {
    color: 'darkred'
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#20212a',
    height: 54,
    width: '100%',
    borderTopColor: '#ddd',
    zIndex: -1, 
  }
})

export default withRouter(TabBar)
