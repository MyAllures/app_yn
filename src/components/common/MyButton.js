import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

/**
 * 组件结构
 * Box
 * --LinearGradient
 * ----View
 * ------children
 */

const propTypes = {
  boxCss: PropTypes.object,
  btnCss: PropTypes.object,
  wrapCss: PropTypes.object,
  textCss: PropTypes.object,
  value: PropTypes.string,
  defineColors: PropTypes.array,
  defineRadius: PropTypes.number,
  disable: PropTypes.bool,
  onPress: PropTypes.func
}

class MyButton extends Component {
  _onPressHandle() {
    const {onPress} = this.props
    if (typeof onPress === 'function') {
      onPress()
    }
  }
  render() {
    const {
      boxCss,
      btnCss,
      wrapCss,
      textCss,
      value,
      defineColors,
      defineRadius,
      disable
    } = this.props

    const Box = disable ? View : TouchableOpacity
    const colors = defineColors ? defineColors : ['#e45250', '#c93836', '#af211e']
    // console.log(colors)
    const radius = defineRadius ? defineRadius : 4
    // 默认按钮
    let defaultButton = (
      <Text style={[styles.text, textCss]}>
        {value ? value : '按钮'}
      </Text>
    )
    let children = this.props.children
    children = children ? children : defaultButton

    return (
      <Box
        style={[styles.box, boxCss]}
        onPress={() => {this._onPressHandle()}}>
        <LinearGradient
          colors={colors}
          style={[
            styles.btn,
            {borderRadius: radius},
            btnCss
          ]}>
          <View style={[styles.wrap, wrapCss]}>
            {children}
          </View>
        </LinearGradient>
      </Box>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'transparent'
  },
  btn: {
    borderRadius: 4
  },
  wrap: {
    height: 59,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 20,
    color: '#ffffff'
  }
})

export default MyButton
