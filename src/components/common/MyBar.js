import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Switch
} from 'react-native'

const propTypes = {
  icon: PropTypes.object,
  iconStyle: PropTypes.object,
  iconComponent: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  wrap: PropTypes.object,
  handler: PropTypes.string,
  text: PropTypes.object,
  whatElement: PropTypes.string,
  handlerColor: PropTypes.object,
}

class MyBar extends Component {
  _onPressHandle(e) {
    const {onPress} = this.props
    if (typeof onPress === 'function') {
      onPress(e)
    }
  }

  renderElement(params) {
    switch(params) {
      case 'text':
        return null

      case 'switch':
        return (<Switch  
          thumbColor='#fff'
          trackColor={{false: '#999999', true: '#58D750'}}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}/>)

      default: return (<Image
        style={styles.handleIcon}
        source={require('../../assets/icon-arrow-2.png')} />)
    }
  }

  render() {
    const {
      icon,
      iconStyle,
      iconComponent,
      title,
      handler,
      textStyle,
      wrap,
      onPress,
      handlerColor,
      whatElement
    } = this.props

    const content = (
      <View style={styles.content}>
        {iconComponent ? iconComponent : (icon ? <Image style={[styles.icon, iconStyle]} source={icon} /> : null)}
        <Text style={[styles.title, textStyle]}>
          {title}
        </Text>
      </View>
    )

    const element = this.renderElement(whatElement)

    const handle = (
      <View style={styles.handleStyle}>
        { handler ? <Text style={[styles.handleText, handlerColor]}>{handler}</Text> : null }
        { element }
      </View>
    )

    // 全按钮
    let context = (
      <TouchableOpacity
        style={wrap}
        onPress={(e) => {
          this._onPressHandle(e)
          // this._alertHandle()
          }}>
        <View style={[styles.wrap, styles.list, wrap]}>
          {content}
          {onPress ? handle : null}
        </View>
      </TouchableOpacity>
    )

    // 单按钮
    if (handler) {
      context = (
        <View style={[styles.wrap, wrap]}>
          {content}
          <TouchableOpacity
            onPress={(e) => {this._onPressHandle(e)}}>
            {onPress ? handle : null}
          </TouchableOpacity>
        </View>
      )
    }

    return context
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: 31,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    backgroundColor: '#20212a'
  },
  list: {
    height: 39
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    color: '#ffffff',
  },
  handleStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  handleIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  handleText: {
    fontSize: 14,
    color: '#BA403E',
  }
})

export default MyBar
