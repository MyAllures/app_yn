import React, {Component} from 'react'

import MyInput from './MyInput.js'
import validate from '../../utils/validate.js'

class MyVerifyInput extends Component {
  static defaultProps = {
    rules: {}
  }
  constructor(props) {
    super(props)
    this.state = {
      msg: ''
    }

    this.check = () => {
      const {rules, val} = this.props
      for (let i = 0; i < rules.length; i++) {
        let msg = validate(rules[i][0], val, rules[i].slice(1))
        if (msg) {
          this._setMsg(msg)
          return msg
        }
      }
      this._setMsg('')
      return false
    }
  }

  _setMsg(msg) {
    this.setState({msg})
  }

  render() {
    return (
      <MyInput 
        {...this.props}
        msg={this.state.msg}
      />
    )
  }
}

export default MyVerifyInput
