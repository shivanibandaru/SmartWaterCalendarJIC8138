import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Expo from 'expo';
import RegistrationScreen from'./screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
//import Calendar from './screens/Calendar';
//import AddCalendar from './screens/AddCalendar';
import { StackNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
		title: 'Home',
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style = {styles.container}>
				<Text style= {styles.titleText} >Georgia Tech Athletics Calendar</Text>
				<View style={{flex: 0.05}}/>
				<Image
					style = {{width: 240, height: 135}}
					source={require('./images/gtLogo.png')}/>
				<View style={{flex: 0.15}}/>
				<View style ={{width: 150}}>
					<Button
						onPress= { ()=> navigate('Registration') }
						title = "Register"
						color = "#EAAA00"
					>
						Register
					</Button>
				</View>
				<View style={{flex: 0.05}}/>
				<View style ={{width: 150}}>
					<Button
						onPress= { ()=> navigate('Login') }
						title = "Login"
						color = "#003057"
					>
						Login
					</Button>
				</View>
			</View>

		)
	}
}

const SmartCalendarAppNavigator = createStackNavigator({
	Home: {screen: HomeScreen },
	Registration: {screen: RegistrationScreen},
	Login: {screen: LoginScreen},
	//Calendar: {screen: Calendar},
	//Add: {sceen: AddCalendar},
	}, {
		navigationOptions: {
			headerStyle: {
				marginTop: Expo.Constants.statusBarHeight,
			}
		}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 2,
	},
	titleText: {
		color: "#545454",
		fontSize: 24,
	},
});

export default class App extends React.Component {
	render() {
		return <SmartCalendarAppNavigator />;
	}
}
//export default () => <RegistrationScreen />;

import * as firebase from "firebase";
