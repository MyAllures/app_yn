import React, { Component} from 'react';
import { 
  
  View, 
  StyleSheet, 
  Text , 
  ScrollView, 
  Platform, 
  ActivityIndicator,
  Image,
  TouchableOpacity,
  BackHandler 
} from 'react-native'
import { WebView } from 'react-native-webview'
import moment from 'moment'
import {Red, Green} from './colors.js'
import Orientation from 'react-native-orientation'
// import WebSelect from '../../components/WebSelect.js'

export default class IndexChart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      loading: true,
      tickData: [],
      orientation: 0,
    }
  }  
  componentWillReceiveProps(nextProps) {
    const {data, newLine, indicator} = nextProps
    if (data !== this.props.data) {
      this.drawLine(data)
      // this.refs.chart.reload()
    }
    if (newLine !== this.props.newLine) {
      this.newLine(newLine)
    }
    if (indicator !== this.props.indicator) {
      this.setIndicator(indicator)
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.orientation) {
        this.setOrientation(0)
      }
      // 禁止后退退出
      return true;
    });
  }
  // shouldComponentUpdate() {
  //   return false
  // }
  componentWillUnmount() {
    // Orientation.lockToPortrait()
  }
  initChart() {
    const {data, indicator} = this.props
    this.setState({loading: false})
    this.setIndicator(indicator)
    if (data) this.drawLine(data)
  }
  drawLine(data) {
    const {openPrice} = this.props
    data = data || this.props.data || {}
    this.sendData({
      method: 'init',
      type: this.props.curType,
      params: Object.assign({}, data.params, {
        openPrice
      }),
      data: data.data,
    })
  }
  newLine(data) {
    data = data || this.props.newLine 
    this.sendData({
      method: 'update',
      data: data.data,
    })
    this.setTick(data.data)
  }
  setIndicator(indicator) {
    console.log('setindicator',indicator)
    this.sendData({
      method: 'setIndicator',
      data: indicator,
    })
    this.newLine()
  }
  sendData(data) {
    this.refs.chart.postMessage(JSON.stringify(data))
  }
  setTick(data) {
    var tickData = [].concat(this.state.tickData)
    var theLast = tickData[tickData.length-1]
    if (theLast && theLast[1] !== data[1]) {
      tickData = []
    } 
    tickData.push(data)
    while (tickData.length > 12) {
      tickData.shift()
    }
    this.setState({tickData})
  }
  arrowRender(flag) {
    let color = flag > 0 ? Red : Green
    if (flag === 0) { color = 'transparent'}
    const arrow = {
      width: 6,
      height: 0,
      borderLeftColor: 'transparent',
      borderLeftWidth: 4,
      borderRightColor: 'transparent',
      borderRightWidth: 4,
      borderBottomColor: flag<0 ? 'transparent' : color ,
      borderBottomWidth: flag<0 ? 0 : 6,
      borderTopColor: flag<0 ? color : 'transparent',
      borderTopWidth: flag<0 ? 6 : 0,
    }
    return (<View style={arrow}></View>)
  }
  tickRender() {
    // console.log(this.state)
    // if (this.props.curType !== 0) {
      return null
    // }
    const data = this.state.tickData
    const list = data.slice(1).map((item, index) => {
      const flag = item[4] - item[3] 
      let color = flag > 0 ? Red : Green
      if (flag === 0) {
        color = '#ccc'
      }
      const arrow = this.arrowRender(flag)
      const minute = moment(item[8]*1000).format('mm:ss')
      const second = moment(item[2]*1000).format('ss:SSS')
      const prev = data[index][7] 
      let vol = item[7] - prev
      vol = vol>=1000 ? (vol/1000).toFixed(2)+'K' : vol
      vol = vol < 0 ? item[7] : vol
      return (
        <View style={styles.listItem} key={index}>
          <Text style={styles.minute}>{minute}</Text>
          <Text style={[styles.second, {color}]}>{item[4].toFixed(2)}</Text>
          <Text style={[styles.vol, {color}]}>{vol || '0'}</Text>
          {arrow}
        </View>
      )
    })
    return (<View style={styles.listBox}>
      {list}
    </View>)
  }
  setOrientation(flag) {
    const {changeFull} = this.props
    console.log('setOrientation',flag)
    if (flag) {
      Orientation.lockToLandscapeLeft()
    } else {
      Orientation.lockToPortrait()
    }
    this.setState({orientation: Number(flag)})
    setTimeout(()=>{
      this.refs.chart.reload()
      setTimeout(()=>{
        this.sendData({
          method: 'orientation',
          data: flag,
        })
        this.initChart()
      }, 200)
    }, 500)
    if (changeFull) {
      changeFull(flag === 1)
    }
  }
  onMessageHandle(e) {
    const target = e.nativeEvent
    const data = JSON.parse(target.data)
    console.log(data)
    switch (data.method){
      case 'orientation':
        this.setOrientation(data.data)
        break
    }
  }
  cancleBtn() {
    const {style, curData} = this.props
    const {orientation} = this.state
    if (!orientation) {
      return null
    }
    return (
      <View style={{height: 40, marginBottom: -40, zIndex: 9,backgroundColor: 'transparent', flexDirection: 'row'}}>
        <View style={{width: 150, alignItems: 'center',paddingTop: 5}}>
          <Text style={{fontSize: 15, color: '#fff'}}>{curData.underlying_name}</Text>
          <Text style={{fontSize: 10, color: '#fff'}}>{curData.underlying}</Text>
        </View> 
        <View style={{flex: 1, alignItems: 'flex-end', marginTop: 10, marginRight: 15}} >
          <TouchableOpacity onPress={()=>this.cancleFull()}>
            <Image source={require('../../../assets/icon-cancel-2.png')} style={styles.cancleBtn}/>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
  cancleFull() {
    this.setOrientation(0)
  }
  onLoadHandle() {
    const {orientation} = this.state
    // this.setOrientation(orientation)
    this.initChart()
    // console.log('onload')
  }
  render() {
    const tpl = (Platform.OS === 'ios') ? require('./indexChart.html') : {uri: 'file:///android_asset/indexChart.html'}
    tpl.uri += '?orientation='+this.state.orientation
    // console.log(tpl, this.refs.chart)
    const {style, curData} = this.props
    const tickRender = this.tickRender()
    // console.log(this)
    return (
      <View style={[{flex: 1, backgroundColor: '#1b1b1b'}, style]}>
        {this.cancleBtn()}
        <WebView
          ref="chart"
          scrollEnabled = {false}
          javaScriptEnabled = {true}
          source={tpl}
          // source={{uri: 'file:///android_asset/indexChart.html'}}
          onLoad={()=>this.onLoadHandle()}
          style={[{flex: 1, backgroundColor: '#1b1b1b'}]}
          onMessage={(e)=>this.onMessageHandle(e)}
        />
        {/*tickRender*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listBox: {
    width: 120,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
    marginTop: 3,
    marginBottom: 10,
  },
  minute: {
    color: '#a6a6a6',
    fontSize: 10,
    marginRight: 8,
  },
  second: {
    color: Red,
    fontSize: 10,
  },
  vol: {
    flex: 1,
    textAlign: 'right',
    marginRight: 3,
    fontSize: 10,
  },
  cancleBtn: {
    // position: 'absolute',
    // top: 10,
    // right: 10,
    width: 21,
    height: 21,
  }
})
