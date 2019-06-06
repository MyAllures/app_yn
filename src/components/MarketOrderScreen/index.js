import React, { Component } from 'react'
import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	CheckBox,
	Text,
	TextInput,
	Image
} from 'react-native'

import Page from  '../common/Page.js'
import NumberPicker from 'react-native-picker-view'
import RadioGroup from 'react-native-radio-buttons-group'

class MarketOrder extends Component {
	constructor () {
		super()
		this.state = {
			isChecked: true,
			amountIndex: 2,
			amountValue: '10',
			lossPointIndex: 2,
			lossPointValue: '100',
			radioGroupData: [
				{
					label: '当日有效',
					color: '#BE3653',
					value: '当日有效'
				},
				{
					label: '本周有效',
					color: '#BE3653',
					value: '本周有效'
				},
			],
		}
	}

	valueChange() {
		this.setState({
			isChecked: !this.state.isChecked,
			
		})
	}
	render () {
		const options = {
      header: {
        title: '创建市价单',
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
				<ScrollView>
					<View style={styles.top}>
						<TouchableOpacity style={styles.topLeft}>
							<CheckBox style={{position: 'absolute', top: 0, left:0}} value={this.state.isChecked} onValueChange={() => this.valueChange()} />
							<Text style={{color: '#fff', fontSize: 18}}>2718.35</Text>
							<Text style={{color: '#fff', fontSize: 18}}>看升</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.topRight}>
							<CheckBox style={{position: 'absolute', top: 0, left:0}} value={this.state.isChecked} onValueChange={() => this.valueChange()}/>
							<Text style={{color: '#fff', fontSize: 18}}>2718.35</Text>
							<Text style={{color: '#fff', fontSize: 18}}>点击切换</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.middle}>
						<View style={styles.titleWrap}>
							<View style={styles.symbolWrap}>
								<Text style={{color: '#fff'}}>us</Text>
							</View>
							<Text style={{color: '#fff', fontSize: 18}}>道琼指数1811(YM)</Text>
						</View>
						<View style={styles.valueStyle}>
							<Text style={{color: '#AD363A'}}>2718.25</Text>
							<Text style={{color: '#AD363A', marginLeft: 8}}>-4.25</Text>
							<Text style={{color: '#AD363A', marginLeft: 8}}>-0.16%</Text>
						</View>
						<View style={styles.dateStyle}>
							<Text style={{color: '#fff'}}>11/06</Text>
							<Text style={{color: '#fff', marginLeft: 8}}>11:27:25</Text>
							<Text style={{color: '#fff', marginLeft: 8}}>CST</Text>
						</View>
					</View>

					{/* <View style={styles.bottom}>
						<Text style={{color: '#fff', marginRight: 15}}>挂盘价：</Text>
						<View style={styles.textInputWrap}>
							<TextInput
								style={styles.textInput}
								onChangeText={(text) => this.setState({text})}
								value={this.state.text}
							>
							</TextInput>
							<View style={styles.arrowWrap}>
								<TouchableOpacity 
									style={{width: '100%', alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 0.25}}
									onPress={() => this.setState({text: String(Number(this.state.text)+1)})}
								>
									<Image 
										style={styles.arrow}
										source={require('../../assets/icon-arrow-4.png')} />
								</TouchableOpacity>
								<TouchableOpacity 
									style={{width: '100%', alignItems: 'center', borderTopColor: '#D9D9D9', borderTopWidth: 0.25}}
									onPress={() => this.setState({text: String(Number(this.state.text)-1)})}
								>
									<Image 
										style={styles.arrow}
										source={require('../../assets/icon-arrow-3.png')} />
								</TouchableOpacity>
							</View>
						</View>
					</View> */}

					<View style={styles.select}>
						<View style={styles.amountWrap}>
							<View style={styles.amount}>
								<Text style={{color: '#fff', marginRight: 15}}>手数：</Text>
								<View style={styles.textInputWrap}>
									<TextInput
										style={styles.textInput}
										onChangeText={(text) => this.setState({amountValue: text})}
										value={this.state.amountValue}
									>
									</TextInput>
									<View style={styles.arrowWrap}>
										<TouchableOpacity 
											style={{width: '100%', alignItems: 'center', borderBottomColor: '#D9D9D9', borderBottomWidth: 1}}
											onPress={() => this.setState({amountValue: String(Number(this.state.amountValue)+1)})}
										>
											<Image 
												style={styles.arrow}
												source={require('../../assets/icon-arrow-4.png')} />
										</TouchableOpacity>
										<TouchableOpacity 
											style={{width: '100%', alignItems: 'center', borderTopColor: '#D9D9D9', borderTopWidth: 1}}
											onPress={() => this.setState({amountValue: String(Number(this.state.amountValue)-1)})}
										>
											<Image 
												style={styles.arrow}
												source={require('../../assets/icon-arrow-3.png')} />
										</TouchableOpacity>
									</View>
								</View>
							</View>
							
							<View style={styles.pickContainer}>
								<NumberPicker
									values={["1","5","10","15","20"]}
									selected={this.state.amountIndex}
									style={{width:150,height:150}}
									enableInput={false}
									onSelect={(value,index) => {
											console.log('onSelect', value, index);
											this.setState({amountValue: value, amountIndex: index}) 
									}}
								/>
						</View>
					</View>

					<View style={styles.pointWrap}>
						<Text style={{color: '#fff', height: 50, lineHeight: 50}}>止损点数： <Text>{this.state.lossPointValue}</Text></Text>
						<View style={styles.pickContainer}>
								<NumberPicker
									values={["50","75","100","150","200"]}
									selected={this.state.lossPointIndex}
									style={{width:150,height:150}}
									enableInput={false}
									onSelect={(value,index) => {
											console.log('onSelect', value, index);
											this.setState({lossPointValue: value, lossPointIndex: index}) 
									}}
								/>
						</View>
					</View>

					</View>
					
					<View style={styles.radioGroup}>
						<RadioGroup
							radioButtons={this.state.radioGroupData}
							onPress={data => this.setState({radioGroupData: data})}
							flexDirection="row"
							style={{marginTop: 30}}
						/>
					</View>

					<TouchableOpacity style={styles.confirmBtn}>
						<Text style={{color: '#fff'}}>确认创建</Text>
						<Text style={{color: '#fff'}}>(保证金：1600.54)</Text>
					</TouchableOpacity>
					
				</ScrollView>
			</Page>

		)
	}
}

const styles = StyleSheet.create({
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginLeft: 16,
		marginRight: 16,
		marginTop: 15
	},
	topLeft: {
		backgroundColor: '#216D2F',
		width: 167,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center'
	},
	topRight: {
		backgroundColor: '#4C232C',
		width: 167,
		height: 60,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center'
	},
	middle: {
		height: 82,
		marginLeft: 16,
		marginRight: 16,
		marginTop: 10,
		backgroundColor: '#2F2F3A',
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleWrap: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	symbolWrap: {
		width: 22,
		height: 14,
		backgroundColor: '#3131A6',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 5
	},
	valueStyle: {
		flexDirection: 'row'
	},
	dateStyle: {
		flexDirection: 'row'
	},
	bottom: {
		height: 50,
		marginLeft: 16,
		marginRight: 16,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2F2F3A'
	},
	textInputWrap: {
		flexDirection: 'row'
	},
	textInput: {
		width: 60,
		height: 30,
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 10,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		borderRightWidth: 1,
		borderRightColor: '#D9D9D9',
		backgroundColor: '#fff',
		color: '#999'
	},
	arrowWrap: {
		width: 20,
		height: 30,
		alignItems: 'center',
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		backgroundColor: '#fff',
	},
	arrow: {
		width: 12,
		height: 12,
	},
	select: {
		height: 215,
		marginLeft: 16,
		marginRight: 16,
		marginTop: 10,
		backgroundColor: '#2F2F3A',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	amountWrap: {
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	amount: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	pickContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#2F2F3A'
	},
	pointWrap: {
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	radioGroup: {
		marginTop: 20,
		marginBottom: 20
	},
	confirmBtn: {
		height: 48,
		backgroundColor: '#BE3653',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 16,
		marginRight: 16,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	}
	
})

export default MarketOrder