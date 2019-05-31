import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, processColor, Button} from 'react-native'
import { Tab, Tabs, TabHeading, StyleProvider, Accordion, Text, View, Container, Header, Content } from 'native-base'
import Page from '../common/Page.js'
import getTheme from '../../../native-base-theme/components'
import material from '../../../native-base-theme/variables/material'
import News from './News'
import MarketRelated from './MarketRelated'
import ContractInfo from './ContractInfo'
import moment from 'moment'
import {BarChart, CombinedChart} from 'react-native-charts-wrapper';

// import Echarts from 'native-echarts'
// import {Echarts, echarts} from 'react-native-secharts'

const mode = ['分时', '5日', '日K', '周K', '月K', '分钟']
const era = moment('1970-01-01', 'YYYY-MM-DD')
const distanceToLoadMore = 10
const pageSize = 60

class KLineScreen extends Component {
  constructor () {
		super()
		
		this.isLoading = false
    this.xMin = 0
		this.xMax = 0

		// this._renderContent = this._renderContent.bind(this)
		// this._renderHeader = this._renderHeader.bind(this)
		
    this.state = {
			active: '分时',
			priceXAxis: {
        drawGridLines: false, // 纵线
        // gridColor: processColor('blue'), //纵线颜色
        // axisLineColor: processColor('red'), // X轴的颜色
        // textColor: processColor('red'),
        drawAxisLine: true,  //是否显示X轴
        granularity: 1,
        granularityEnabled: true,
        valueFormatter: 'date',
        valueFormatterPattern: 'MM-dd',
        since: 0,
        timeUnit: 'DAYS'
      },
      volumeXAxis: {
        // axisLineColor: processColor('red'),
        drawGridLines: false,
        drawAxisLine: false,  //是否显示X轴
        axisLineColor: processColor('red'),
        axisLineWidth: 100,
        drawLabels: true, //是否显示X轴的字段
        position: 'BOTTOM',
        granularity: 1,
        granularityEnabled: true,
        valueFormatter: 'date',
        valueFormatterPattern: 'MM-dd',
        since: 0,
        timeUnit: 'DAYS',
      },
      visibleRange: {x: {min: 1, max: 30}},
    }
  }

  select(mode) {
    this.setState({
      active: mode
    })
  }

	handleChange(event) {
    let nativeEvent = event.nativeEvent

    if (nativeEvent.action == 'chartTranslated') {
      let {left, right, centerX} = nativeEvent

      if (!this.isLoading) {

        if (this.xMin > left - distanceToLoadMore || right + distanceToLoadMore > this.xMax) {

          this.isLoading = true

          // Because of the implementation of MpAndroidChart, if the action of setDataAndLockIndex is triggered by user dragging,
          // then the size of new data should be equal to original data, otherwise the calculation of position transition won't be accurate,
          // use may find the chart suddenly blink to another position.
          // This restriction only exists in android, in iOS, we have no such problem.

          let toIndex = Math.min(centerX + pageSize, moment().diff(era, 'days'));
          let fromIndex = toIndex - 2 * pageSize;

          let from = era.clone().add(fromIndex, 'days').format('YYYY-MM-DD')
          let to = era.clone().add(toIndex, 'days').format('YYYY-MM-DD')
          this.mockLoadData(from, to).then((data) => {
            let newData = this.generateNewData(from, to, data);
            this.refs.priceChart.setDataAndLockIndex(newData.combinedData)
            this.refs.volumeChart.setDataAndLockIndex(newData.volumeData)
            this.isLoading = false
          })
        }
      }
    }
	}
	
	mockLoadData(from, to) {
    return new Promise(resolve => {
      setTimeout(() => {

        let fromIndex = this.getIndexOfDay(from)
        let toIndex = this.getIndexOfDay(to)

        this.xMin = fromIndex
        this.xMax = toIndex

        console.log("load data from " + from + " to " + to)
        console.log("fromIndex " + fromIndex + " toIndex " + toIndex)
        resolve(
          Array.from(new Array(parseInt(toIndex - fromIndex)), (val, index) => {
            let x = fromIndex + index;
            let y = Math.abs(100 * Math.sin(0.1 * x))
            let date = era.clone().add(x, 'days');

            // no data in weekend
            if (date.isoWeekday() < 6) {
              if(x % 2 == 0) {
                return {
                  date: date.format('YYYY-MM-DD'),
                  shadowH: y + 220,
                  shadowL: y + 180,
                  open: y + 190,
                  close: y + 200,
                  ma5: y + 170,
                  ma15: y + 150,
                  volume: Math.abs(100 * Math.cos(0.1 * x)) + 100
                }
              } else {
                return {
                  date: date.format('YYYY-MM-DD'),
                  shadowH: y + 220,
                  shadowL: y + 180,
                  open: y + 200,
                  close: y + 190,
                  ma5: y + 170,
                  ma15: y + 150,
                  volume: Math.abs(100 * Math.cos(0.1 * x)) + 100
                }
              }
            } else {
              return null
            }
          }).filter(x => x))
      }, 50)
    })
	}
	
	generateNewData(from, to, data) {
    let fromIndex = this.getIndexOfDay(from)
    let toIndex = this.getIndexOfDay(to)
    const priceData = data.map(e => ({
      x: this.getIndexOfDay(e.date),
      shadowH: e.shadowH,
      shadowL: e.shadowL,
      open: e.open,
      close: e.close,
      date: e.date
    }))
    const ma5Data = data.map(e => ({x: this.getIndexOfDay(e.date), y: e.ma5}))
    const ma15Data = data.map(e => ({x: this.getIndexOfDay(e.date), y: e.ma15}))
    const volumeData = data.map(e => ({x: this.getIndexOfDay(e.date), y: e.volume}))

    return {
      combinedData: {
        lineData: {
          dataSets: [{
            values: ma5Data,
            label: 'ma5', //标题名
            config: {
              // lineWidth: 100,
              drawCircleHole: false,
              drawValues: false, //是否显示值
              mode: "CUBIC_BEZIER",
              drawCircles: false, 
              color: processColor('yellow'), //线的颜色
              // dashedLine: {
              //   lineLength: 100, // required
              //   spaceLength: 100, // required
              //   phase: 100
              // },
            }
          }, {
            values: ma15Data,
            label: 'ma15',
            config: {
              drawValues: false,
              mode: "CUBIC_BEZIER",
              drawCircles: false,
              color: processColor('blue')
            }
          }],
        },
        candleData: {
          dataSets: [{
            values: priceData,
            label: 'price', // K线标题名
            config: {
              // colors: [100],
              visible: true, // 是否显示线图
              // valueTextColor: 'green',
              valueTextSize: 12,
              drawValues: false, //是否显示值
              highlightColor: processColor('red'), //点击时高亮的颜色
              shadowColor: processColor('black'),
              shadowWidth: 1,
              shadowColorSameAsCandle: true,
              increasingColor: processColor('#71BD6A'), //增加的颜色
              increasingPaintStyle: 'FILL', 
              decreasingColor: processColor('#D14B5A') //减少的颜色
            }
          }],
        }
      },
      volumeData: {
        dataSets: [{
          values: volumeData,
          label: 'volume', // BarChat标题名
          config: {
            drawValues: false, //BarChat是否显示值
          }
        }]
      }
    }
	}
	
	getIndexOfDay(day) {
    return moment(day, 'YYYY-MM-DD').diff(era, 'days')
  }

	componentDidMount() {
    let today = moment().format('YYYY-MM-DD')
    let start = moment().add(-2 * pageSize, 'days').format('YYYY-MM-DD')

    // for example, this company ipo at 2017-1-1, you can get this information from your server
    let axisMinimum = this.getIndexOfDay('2017-01-01') - 0.5;
    let axisMaximum = this.getIndexOfDay(today) + 0.5;

    this.mockLoadData(start, today).then((data) => {
      this.setState({
        ...this.generateNewData(start, today, data),
        zoom: {scaleX: 1, scaleY: 1, xValue: this.getIndexOfDay(today) - 5, yValue: 0, axisDependency: 'RIGHT'},
        priceXAxis: {...this.state.priceXAxis, axisMinimum: axisMinimum, axisMaximum: axisMaximum},
        volumeXAxis: {...this.state.volumeXAxis, axisMinimum: axisMinimum, axisMaximum: axisMaximum}
      })
    })
  }

  render () {
		const options = {
      header: {
        title: '道琼指数',
        goback: true,
        tips: '',
        more: ''
      },
      tabBar: {                                                                                                                                                                                                                                                                                                                    
        type: 'KLine',
        visible: true
      }
    }
		return (
			<Page
				header={options.header}
				tabBar={options.tabBar}>
        <ScrollView>
          <View style={styles.headerPanel}>
            <View style={styles.headerLeft}>
              <Text style={{color: '#CC3333', fontSize: 16, fontWeight: 'bold'}}>2718.25</Text>
              <View style={styles.headerLeftBottom}>
                <Text style={{color: '#CC3333', fontSize: 14}}>-4.25</Text>
                <Text style={{color: '#CC3333', fontSize: 14, marginLeft: 10}}>0.16%</Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              <View style={styles.headerRightTop}>
                <Text style={{color: '#999', fontSize: 16}}>卖盘</Text>
                <Text style={{color: '#CC3333', fontSize: 14, marginLeft: 20}}>2718.50</Text>
                <Text style={{color: '#999', fontSize: 14, marginLeft: 20}}>34</Text>
              </View>
              <View style={styles.headerRightBottom}>
                <Text style={{color: '#999', fontSize: 16}}>买盘</Text>
                <Text style={{color: '#CC3333', fontSize: 14, marginLeft: 20}}>2718.25</Text>
                <Text style={{color: '#999', fontSize: 14, marginLeft: 20}}>8</Text>
              </View>
            </View>
          </View>

          <View style={styles.kLinePanel}>
            <View style={styles.mode}>
              {
                mode.map((mode, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => this.select(mode)}>
                      <Text style={{color: this.state.active === mode ? '#CC3333' : '#fff'}}>{mode}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>

            <View style={styles.KLineContainer}>
              <View style={styles.kLine}>
								<CombinedChart
									data={this.state.combinedData}
									xAxis={this.state.priceXAxis}
									onChange={(event) => this.handleChange(event)}
									visibleRange={this.state.visibleRange}
									zoom={this.state.zoom}

									group="stock"
									identifier="price"
									syncX={true}
									syncY={false}

									dragDecelerationEnabled={false}
									yAxis={{left: {enabled: true}, right: {enabled: false}}}
									ref="priceChart"
									doubleTapToZoomEnabled={false}  // it has to be false!!
									chartDescription={{text: ""}}
									legend={{verticalAlignment: "TOP", textColor: processColor('#fff') }} // 标题提示位置
									style={styles.price}/>


								<BarChart
									data={this.state.volumeData}
									xAxis={this.state.volumeXAxis}
									onChange={(event) => this.handleChange(event)}
									visibleRange={this.state.visibleRange}
									zoom={this.state.zoom} //柱状

									group="stock"
									identifier="volume"
									syncX={true}
									syncY={false}

									dragDecelerationEnabled={false}
									yAxis={{left: {enabled: true}, right: {enabled: false} }}
									ref="volumeChart"
									doubleTapToZoomEnabled={false}  // it has to be false!!
									chartDescription={{text: ""}}
									style={styles.volume}/>
              </View>

              <View style={styles.dataList}>

              </View>

            </View>
						
						{/* <Container style={{marginTop: 6}}>
							<Accordion
								style={{ backgroundColor: "#1B1B1B" }}
								dataArray={futuresData}
								animation={true}
								expanded={true}
								renderHeader={this._renderHeader}
								renderContent={this._renderContent}
							/>
						</Container> */}

						{/* <View style={styles.kLineInfo}>
							<View style={styles.item}>
								<Text>最高</Text>
								<Text>2723.00</Text>
							</View>
							<View>
								<Text>最低</Text>
								<Text>2713.00</Text>
							</View>
							<View>
								<Text>成交量</Text>
								<Text>20324</Text>
							</View>
							<TouchableOpacity>
								<Image source={require('../../assets/icon-arrow-4.png')} style={styles.arrow}/>
							</TouchableOpacity>
						</View> */}


          </View>

          <Container style={styles.tabContainer}>
            <StyleProvider style={getTheme(material)}>
              <Tabs tabBarUnderlineStyle={{width: 55, height: 2, marginLeft: 35}}>
                <Tab heading={ <TabHeading><Text>相关新闻</Text></TabHeading>}>
                  <News />
                </Tab>

                <Tab heading={ <TabHeading><Text>关联行情</Text></TabHeading>}>
                  <MarketRelated />
                </Tab>

                <Tab heading={ <TabHeading><Text>合约资料</Text></TabHeading>}>
                  <ContractInfo />
                </Tab>
              </Tabs>
            </StyleProvider>
          </Container>

        </ScrollView>
			</Page>
		)
  }
}

const styles = StyleSheet.create({
  headerPanel: {
    height: 82,
    backgroundColor: '#20212A',
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerLeft: {
    flex: 1,
    alignItems: 'center'
  },  
  headerLeftBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  headerRight: {
    flex: 1
  },
  headerRightTop: {
    paddingRight: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerRightBottom: {
    paddingRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  kLinePanel: {
    marginTop: 7,
  },
  mode: {
    height: 30,
    backgroundColor: '#20212A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  KLineContainer: {
    height: 320,
    flexDirection: 'row'
  },
  kLine: {
    flex: 3
  },
  dataList: {
    flex: 2
  },
  tabContainer: {
    marginTop: 7
	},
	price: {
    flex: 4
  },
  volume: {
    flex: 2
	},
	arrow: {
		width: 18,
		height: 18,
		marginRight: 12,
	},
})

export default KLineScreen

