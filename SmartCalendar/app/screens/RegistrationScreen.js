import React, { Component } from 'react';
import Expo from 'expo';
import { Alert, View } from 'react-native';
import { Button, Container, Content, Form, Header, Input, Item, Label, Text } from 'native-base';

import firebase from "firebase/app";
import "firebase/database";

// firebase configuration data
global.firebaseConfig = {
  apiKey: "AIzaSyAG9qRaaixzJOVltp_m4vo2UJP-LHDd9W0",
  authDomain: "smartwatercalendarjic8138.firebaseapp.com",
  databaseURL: "https://smartwatercalendarjic8138.firebaseio.com",
  projectId: "smartwatercalendarjic8138",
  storageBucket: "smartwatercalendarjic8138.appspot.com",
  messagingSenderId: "707210951412"
};


export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gtId: "",
      email: "",
      password: "",
      confirmPassword: "",
      isReady: false
    };
    this.verifyNewUserCredentials = this.verifyNewUserCredentials.bind(this);
    this.onRegistrationTap = this.onRegistrationTap.bind(this);
    this.app = firebase.initializeApp(firebaseConfig);
    this.database = firebase.database()
   }

  /**
  * Load fonts before doing anything
  */
   async componentWilMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  /**
  * Check if a user is trying to register with valid credentials
  */
  verifyNewUserCredentials(anEmail, aFirstName, aLastName, aGTID, aPassword, aConfirmPassword) {
    if ((anEmail.length > 0)
      && (aFirstName.length > 0)
      && (aLastName.length > 0)
      && (aGTID.length === 9)
      && (aPassword === aConfirmPassword)
      && (aPassword.length >= 8)) {
        return true;
    } else if (anEmail.length === 0) {
      Alert.alert("Please enter a valid email.");
    } else if (aFirstName.length === 0 || aLastName.length === 0) {
      Alert.alert("Please enter a first and last name.");
    } else if (aGTID.length != 9) {
      Alert.alert("Please enter a valid GTID.");
    } else if (aPassword.length < 6) {
      Alert.alert("The password must be at least 8 characters long.");
    } else if (aPassword !== aConfirmPassword) {
      Alert.alert("Password and Confirm password do not match");
    } else {
      Alert.alert("Sorry I don't know what's wrong ")
    }
    return false;
  }

  onRegistrationTap(event) {
    const theEmail = this.state.email;
    const theFirstName = this.state.firstName;
    const theLastName = this.state.lastName;
    const theGTID = this.state.gtId;
    const thePassword = this.state.password;
    const theConfirmPassword = this.state.confirmPassword;

    var validUser = this.verifyNewUserCredentials(
      theEmail,
       theFirstName,
        theLastName,
         theGTID,
          thePassword,
           theConfirmPassword);
    // if user has valid credentials, authenticate, log them in, and store their data in database
     if (validUser) {
        var ref = database.ref();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
          uid = String(firebase.auth().currentUser.uid)
          var usersRef = ref.child("users/" + uid;
          usersRef.set({
            uid: {
              email: theEmail,
              first: theFirstName,
              last: theLastName,
              gtid: theGTID
            },
          });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          print(errorMessage)
          // ...
        });
     }
  }

  render() {
    return (
      <Container>
        <Header
          leftComponent={{color: '#fff' }}
          centerComponent={{ text: 'Registration', style: { color: '#fff' } }}
          rightComponent={{color: '#fff' }}
        />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={(email) => this.setState({email})}
                value = {this.state.email}/>
            </Item>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input
                onChangeText={(firstName) => this.setState({firstName})}
                value = {this.state.firstName}/>
            </Item>
            <Item floatingLabel>
              <Label>Last Name</Label>
              <Input
                onChangeText={(lastName) => this.setState({lastName})}
                value = {this.state.lastName}/>
            </Item>
            <Item floatingLabel>
              <Label>GTID</Label>
              <Input
                onChangeText={(gtId) => this.setState({gtId})}
                value = {this.state.gtId}/>
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry
                onChangeText={(password) => this.setState({password})}
                value = {this.state.password}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input secureTextEntry
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                value = {this.state.confirmPassword} />
            </Item>
          </Form>
          <Button block warning onPress = {this.onRegistrationTap}>
            <Text>Register</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
