import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  AlertIOS
} from 'react-native'

import Page from '../common/Page.js'
import MyBar from '../common/MyBar.js'
import AlertAndroid from '../common/AlertAndroid' // 封装好的仿IOS的 alert组件

const mainTitle = {
  lineHeight: 21,
  color: '#E4E4E4',
  fontWeight: '500',
  fontStyle: 'normal',
  fontSize: 16
}

const mainIcon = {
  width: 55,
  height: 55
}

const mainWrap = {
  height: 78,
  marginTop: 1,
  marginBottom: 10
}

const minorTitle = {
  lineHeight: 19,
  color: '#E4E4E4',
  fontWeight: '500',
  fontStyle: 'normal',
  fontSize: 14
}

const minorIcon = {
  width: 23,
  height: 23
}

const minorWrap = {
  height: 38
}

const myBarData = [
  {
    title: '请登录账户',
    textStyle: mainTitle,
    icon: require('../../assets/icon-avatar.png'),
    iconStyle: mainIcon,
    wrap: mainWrap,
    handleOption: '/Login'
  },
  {
    title: '期货账户',
    textStyle: minorTitle,
    icon: require('../../assets/icon-accountnumber.png'),
    iconStyle: minorIcon,
    handler:'未开启',
    wrap: {...minorWrap, ...{marginBottom: 2}},
    handleOption: '/Futures-Account'
  },
  {
    title: '关于野牛',
    textStyle: minorTitle,
    wrap: {...minorWrap, ...{marginBottom: 2}}
  },
  {
    title: '我的邀请码',
    textStyle: minorTitle,
    icon: require('../../assets/icon-invitecode.png'),
    iconStyle: minorIcon,
    wrap: {...minorWrap, ...{marginBottom: 10}}
  },
  {
    title: '帮助中心',
    textStyle: minorTitle,
    icon: require('../../assets/icon-helpcenter.png'),
    iconStyle: minorIcon,
    wrap: {...minorWrap, ...{marginBottom: 2}}
  },
  {
    title: '线上咨询',
    textStyle: minorTitle,
    icon: require('../../assets/icon-onlineask.png'),
    iconStyle: minorIcon,
    wrap: {...minorWrap, ...{marginBottom: 2}}
  },
  {
    title: '电话客服 ( 工作日 09:30 - 18:30 )',
    textStyle: minorTitle,
    icon: require('../../assets/icon-phone.png'),
    iconStyle: minorIcon,
    wrap: {...minorWrap, ...{marginBottom: 2}},
    handleOption: {
      title: '电话客服',
      content: '客服电话：01052923231',
      button: ['取消', '拨打']
    }
  },
  {
    title: '意见建议',
    textStyle: minorTitle,
    icon: require('../../assets/icon-suggest.png'),
    iconStyle: minorIcon,
    wrap: {...minorWrap, ...{marginBottom: 10}},
    handleOption: {
      title: '意见建议',
      content: '将意见发送到product@bbnfutures.com',
      button: ['取消', '发邮件']
    }
  },
  {
    title: '设置',
    textStyle: minorTitle,
    icon: require('../../assets/icon-setting.png'),
    iconStyle: minorIcon,
    wrap: minorWrap,
    handleOption: '/Setting'
  }
]

class MainScreen extends Component {

  pressHandle(params) {
    if (typeof params === 'string') {
      const { history } = this.props
      history.push(params)
    } else if (params instanceof Object) {
      this.refs.alertAndroid.alertWithOptions(
        {
          title: params.title,
          detailText: params.content,
          options: params.button
        },
        // index是当前点击选项的索引
        (index)=>{
          if(index == 0) {
            console.log('取消了')
          }
        }
      )
    }
  }

  myBar(data) {
    return data.map((item, index) => {
      return (
        <MyBar
          key={index}
          wrap={item.wrap}
          title={item.title}
          textStyle={item.textStyle}
          icon={item.icon}
          iconStyle={item.iconStyle}
          handler={item.handler}
          onPress={()=> this.pressHandle(item.handleOption)} 
          />
      )
    })
  }
  render() {
    const myBar = this.myBar(myBarData)
    const alertAndroid = <AlertAndroid ref="alertAndroid" />
    const options = {
      header: {
        title: '我的',
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
        tabBar={options.tabBar}
      >
        <ScrollView style={styles.main}>
          {myBar}
          {alertAndroid}
        </ScrollView>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

export default MainScreen
