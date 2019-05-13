import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

class MyInput extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={[styles.myInput, this.props.userStyle]}
          underlineColorAndroid={'transparent'}
          {...this.props} />
        <View style={[styles.msg, this.props.msgWrapStyle]}>
          <Text
            numberOfLines={2}
            style={[styles.msgText, this.props.msgStyle]}>
            {this.props.msg}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  myInput: {
    height: 43,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#dedede',
    backgroundColor: '#fff',
    lineHeight: 43,
    fontSize: 12,
    padding: 0,
    paddingLeft: 9,
    color: '#9a9a9a',
  },
  msg: {
    position: 'absolute',
    top: 0,
    right: 5,
    maxWidth: 145,
    height: 43,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  msgText: {
    fontSize: 12,
    color: 'red'
  }
})

export default MyInput
