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
import { CheckBox, Body } from 'native-base'

import Page from './common/Page.js'
import MyVerifyInput from './common/MyVerifyInput.js'
import MyButton from './common/MyButton.js'
class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    const {location} = props
    this.state = {
      phoneNumber: ''
    }
  }
  textChange(key, val) {
    console.log(key, val)
    let tmp = {}
    tem[key] = val
    this.setState(tmp)
  }
  render() {
    const options = {
      header: {
        title: '创建账号',
        goback: true,
        tips: '',
        more: ''
      },
      tabBar: {
        type: '',
        visible: false
      }
    }
    return (
      <Page
        header={options.header}
        tabBar={options.tabBar}>
        <ScrollView style={styles.main}>
          <View style={styles.formGroup}>
            <View style={styles.inputGroup}>
              <View style={styles.inputImage}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../assets/icon-phonenumber-1.png')} />
              </View>
              <MyVerifyInput
                ref='username'
                rules={[
                  ['noEmpty'],
                  ['minLength', 6],
                  ['maxLength', 11],
                  ['type', 'number']
                ]}
                val={this.state.phoneNumber}
                style={styles.myInput}
                keyboardType={'numeric'}
                maxLength={11}
                placeholder='输入手机号码'
                onChangeText={(val) => this.textChange('phoneNumber', val)} />
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputImage}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../assets/icon-advisory-0.png')}/>
              </View>
              <MyVerifyInput
                ref='phoneMessage'
                rules={[
                  ['noEmpty'],
                  ['minLength', 6],
                  ['maxLength', 20],
                  ['type', 'password']
                ]}
                val={this.state.password}
                onChangeText={(val) => this.textChange('phoneMessage', val)}
                style={styles.myInput}
                secureTextEntry={true}
                maxLength={20}
                placeholder='短信验证码' />
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputImage}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../assets/icon-password-1.png')}/>
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
                placeholder='设置登录密码' />
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputImage}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../assets/icon-invitingcode-1.png')} />
              </View>
              <MyVerifyInput
                ref='username'
                rules={[
                  ['noEmpty'],
                  ['minLength', 6],
                  ['maxLength', 11],
                  ['type', 'number']
                ]}
                val={this.state.phoneNumber}
                style={styles.myInput}
                keyboardType={'numeric'}
                maxLength={11}
                placeholder='邀请码 ( 可以不填 )'
                onChangeText={(val) => this.textChange('phoneNumber', val)} />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 30}}>
              <CheckBox checked={false} color="#BA403E"/>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#fff'}}>已阅读并同意</Text>
                <Text style={{color: '#BA403E'}}>《注册协议与风险说明书》</Text>
              </View>
            </View>
            <MyButton							
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
							value={'确认'}
							defineColors={['#ba403e', '#ba403e', '#ba403e']}
							defineRadius={2}
						/>
          </View>
        </ScrollView>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 40
  },
  formGroup: {
    paddingLeft: 41,
    paddingRight: 41
  },
  inputGroup: {
    position: 'relative',
    width: '100%',
    height: 51,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    marginBottom: 13,
    alignItems: 'center'
  },
  inputImage: {
    width: 58,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default withRouter(RegisterScreen)
