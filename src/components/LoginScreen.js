import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-native'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import Page from './common/Page.js'
import MyButton from './common/MyButton.js'
import MyVerifyInput from './common/MyVerifyInput.js'
import url from '../utils/url'
import * as Url from '../constants/Url'
import SHA256 from 'sha256'
import store from '../store/configure-store.js'
import { mainServer } from '../utils/connectInit'
import meta from '../../package.json'
import requestId from '../utils/requestId'
import api from '../api/connectApi'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    const {location} = props
    const query = url.parse(location.search)
    this.state = {
      passwordVisible: true,
      username: '',
      password: '',
      from: query.from || '/Me'
    }
  }
  textChange(key, val) {
    let tmp = {}
    tmp[key] = val
    this.setState(tmp)
  }
  login() {
    let {username, password} = this.state
    password = SHA256(password)
    console.log(username,password)

    // fetch('http://real.v2.desktop.bbncapital.com/user/login', {
    //   method: 'POST',
    //   headers:{
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     'username': username,
    //     'password': password
    //   })
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))

    console.log(store.getState())

    let params = {
      requestId: requestId('001'),
      client_version: meta.name + meta.version
    }
    mainServer.send(api.request('ACCOUNT_LOGON', params))

    store.subscribe(() => {
      console.log(store.getState())
    })
  }
  render() {
    const options = {
      header: {
        title: '登录账户',
        goback: true,
        tips: '',
        more: ''
      },
      tabBar: {
        type: '',
        visible: false,
        footerVisible: true
      }
    }
    return (
      <Page
        header={options.header}
        tabBar={options.tabBar}>
        <ScrollView style={styles.main}>
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={require('../assets/icon-logo.png')} />
            <Text style={styles.logoText}>
              野牛期货
            </Text>
          </View>
          <View style={styles.formGroup}>
            <View style={styles.inputGroup}>
              <View style={styles.inputImage}>
                <Image
                  style={{width: 20, height: 22}}
                  source={require('../assets/icon-username.png')}/>
              </View>
              <MyVerifyInput 
                ref='username'
                rules={[
                  ['noEmpty'],
                  ['minLength', 6],
                  ['maxLength', 11],
                  ['type', 'number'],
                ]}
                val={this.state.username}
                style={styles.myInput}
                keyboardType={'numeric'}
                maxLength={11}
                placeholder='请输入手机号或数字账号'
                onChangeText={(val) => this.textChange('username', val)} />
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputImage}>
                <Image
                  style={{width: 20, height: 22}}
                  source={require('../assets/icon-password.png')}/>
              </View>
              <MyVerifyInput
                ref='password'
                rules={[
                  ['noEmpty'],
                  ['minLength', 6],
                  ['maxLength', 20],
                  ['type', 'password']
                ]}
                val={this.state.password}
                onChangeText={(val) => this.textChange('password', val)}
                style={styles.myInput}
                secureTextEntry={true}
                maxLength={20}
                placeholder='请输入密码' />
            </View>
            <View>
              <Link
                to={'/Me'}
                component={TouchableOpacity}
                style={styles.formLink}>
                <Text style={styles.linkForget}>
                  忘记密码
                </Text>
              </Link>
            </View>
            <MyButton
              boxCss={{
                marginTop: 10,
                marginBottom: 10
              }}
              wrapCss={{
                height: 45
              }}
              textCss={{
                fontFamily: '微软雅黑',
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: 16,
                color: '#ffffff'
              }}
              value={'登录'}
              defineColors={['#ba403e', '#ba403e', '#ba403e']}
              defineRadius={2}
              onPress={() => {this.login()}}
            />
            <View>
              <Link
                to={'/Register'}
                component={TouchableOpacity}
                style={styles.formLink}>
                <Text style={styles.linkApply}>
                  创建账号
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  logoBox: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 120,
    height: 71,
    marginBottom: 5
  },
  logoText: {
    lineHeight: 20,
    fontFamily: '微软雅黑 Regular',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#cccccc'
  },
  formGroup: {
    paddingLeft: 41,
    paddingRight: 41,
  },
  inputGroup: {
    position: 'relative', 
    width: '100%',
    height: 51,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 2,
    marginBottom: 13,
    alignItems: 'center',
  },
  inputImage: {
    width: 58,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formLink: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5
  },
  linkForget: {
    textAlign: 'right',
    lineHeight: 20,
    fontFamily: '微软雅黑',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 12,
    color: '#999999'
  },
  linkApply: {
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: '微软雅黑',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 12,
    color: '#cc3333'
  }
})

export default withRouter(LoginScreen)