import React, { Component } from "react";
import Expo from 'expo';
import { Alert, View } from 'react-native';
import { Button, Container, Content, Form, Header, Input, Item, Label, Text } from 'native-base';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.validateForm = this.validateForm.bind(this);
    this.onLoginTap = this.onLoginTap.bind(this);
  }

  validateForm() {
    if (this.state.email.length > 0 && this.state.password.length > 0) {
      return true;
    } else {
        Alert.alert("Please enter your email and password");
    }
  }

  onLoginTap(even) {

    var validUser = this.validateForm();
     if (validUser) {
       //Check database for match
     }
  }

  render() {
    return (
      <Container>
        <Header
          leftComponent={{color: '#fff' }}
          centerComponent={{ text: 'Login', style: { color: '#fff' } }}
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
              <Label>Password</Label>
              <Input secureTextEntry
                onChangeText={(password) => this.setState({password})}
                value = {this.state.password}/>
            </Item>
          </Form>
          <Button block warning onPress = {this.onLoginTap}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
