import React, { Component } from 'react';
import Expo from 'expo';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, Container, Content, DatePicker, Form, Header, Input, Item, Label, Picker, Text } from 'native-base';

export default class AddEventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isAllDay: false,
      startDay: new Date(2000, 1, 1),
      endDay: new Date(2000, 2, 2),
      startTime: new Date(),
      endTime: new Date(),
      isTimePickerVisible: false,
      description: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onAddEventTap = this.onAddEventTap.bind(this);
  }

  /**
  * Load fonts before doing anything
  */
   async componentWilMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleStartTimePicked = (date) => {
     this.setState({startTime});
     this._hideTimePicker();
   };

   _handleEndTimePicked = (date) => {
      this.setState({endTime});
      this._hideTimePicker();
    };

  onValueChange(value: boolean) {
    this.setState({
      isAllDay: value
    });

  onAddEventTap(event) {

    const mIsAllDay = this.state.isAllDay;
    const mStartDay = this.state.startDay;
    const mEndDay = this.state.endDay;
    const mStartTime = this.state.startTime;
    const mEndTime = this.state.endTime

    var startDate = new Date();
    var endDate = new Date();

    if (mIsAllDay) {
      startDate = mStartDay;
      endDate = mEndDay;
    } else {
      startDate = mStartDay.setTime(mStartTime.getTime());
      endDate = mEndDay.setTime(mEndTime.getTime());
    }

    const newEvent = {
      'title': this.state.title,
      'allDay': this.state.isAllDay,
      'start': startDate,
      'end': endDate,
      'desc': this.state.description
    }
  }

  render() {
    return (
      <Container>
        <Header
          leftComponent={{color: '#fff' }}
          centerComponent={{ text: 'Add Event', style: { color: '#fff' } }}
          rightComponent={{color: '#fff' }}
        />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Title Of Event</Label>
              <Input
                onChangeText={(title) => this.setState({title})}
                value = {this.state.title}/>
            </Item>
            <Picker
              mode="dropdown"
              placeholder="No"
              placeholderStyle={{ color: "black" }}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Yes" value= true />
              <Picker.Item label="No" value= false />
            </Picker>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2000, 1, 1)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "blue" }}
              placeHolderTextStyle={{ color: "black" }}
              onDateChange={(startDay) => this.setState({startDay})}
            />
            <Text>
              Start Date: {this.state.startDay.toString().substr(4, 12)}
            </Text>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2000, 1, 1)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "blue" }}
              placeHolderTextStyle={{ color: "black" }}
              onDateChange={(endDay) => this.setState({endDay})}
            />
            <Text>
              End Day: {this.state.endDay.toString().substr(4, 12)}
            </Text>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text>Select Start Time</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isTimePickerVisible}
                onConfirm={this._handleStartPicked}
                onCancel={this._hideTimePicker}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text>Select End Time</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isTimePickerVisible}
                onConfirm={this._handleEndTimePicked}
                onCancel={this._hideTimePicker}
              />
            </View>
            <Item floatingLabel>
              <Label>Event Description</Label>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Enter a brief description of the event"
                onChangeText={(description) => this.setState({description})}
                value = {this.state.description} />
            </Item>
          </Form>
          <Button block warning onPress = {this.onAddEventTap}>
            <Text>Add Event</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
