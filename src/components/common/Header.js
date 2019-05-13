import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-native'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import {isFunc} from '../../utils/judgement.js'

class Header extends Component {
  gobackHandle() {
    const { history, gobackHref, goback } = this.props
    if(isFunc(goback)) {
      return goback()
    }
    if (gobackHref) {
      history.push(gobackHref)
    } else if (history.length <= 1) {
      history.push('/Me')
    } else {
      history.go(-1)
    }
  }

  renderLeft(goback, tips) {
    const { gobackText } = this.props
    if (!goback) {
      return null
    } else {
      return (
        <TouchableHighlight
          underlayColor={'rgba(0, 0, 0, 0.2)'}
          onPress={() => this.gobackHandle()}>
          <View style={styles.gobackBtn}>
            <Image
              style={styles.goback}
              source={require('../../assets/icon-arrow-1.png')} />
            <Text
              style={[styles.gobackText, {display: gobackText ? 'flex' : 'none'}]}>
              {gobackText}
            </Text>
          </View>
        </TouchableHighlight>
      )
    }
  }

  renderCenter(title) {
    let center = null
    if (typeof title === 'object') {
    } else {
      center = (
        <View style={styles.center}>
          <Text numberOfLines={1} style={styles.normalTitle}>{title}</Text>
        </View>
      )
    }
    return center
  }

  renderRight(more) {
    let right = null
    if (!more) {
      return right
    }
  }

  render() {
    const { title, goback, tips, more } = this.props
    const left = this.renderLeft(goback, tips)
    const center = this.renderCenter(title)
    const right = this.renderRight(more)
    return (
      <View style={styles.header}>
        <View style={styles.left}>
          {left}
        </View>
        {center}
        <View style={styles.right}>
          {right}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#20212a'
  },
  left: {
    width: 80,
    alignItems: 'center',
    flexDirection: 'row'
  },
  goback: {
    width: 11,
    height: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  gobackText: {
    color: '#fff',
    backgroundColor: 'transparent'
  },
  gobackBtn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    width: 90,
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  normalTitle: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: '500'
  }
})

const mapStateToProps = (state) => {
  return {}
}

const mapDispathToProps = (dispatch) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Header))
