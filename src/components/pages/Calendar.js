import firebase from 'firebase';
import React, { Component } from 'react';
import { Image, Linking, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Container, Content, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Right } from 'native-base';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import CalendarHeader from '../CalendarHeader';
import BackgroundImage from './bg';

const swipeForward = require('../Assets/forwardArrow.png');
const url = 'https://www.facebook.com/events/428188540972908/';
const cards = [];
const cardWidth = 0;
const likeMargin = 0;
const imageHeight = 0;
const dateFontSize= 0;
const noteFontSize = 0;
const titleFontSize = 0;
const locationFontSize = 0;
const lastRowMarginTop = 0;
const lastRowMarginBottom = 0;
const lastRowFontSize = 0;

if (Platform.isPad) {
  cardWidth = '85%';
  likeMargin = '54%'
  imageHeight = 370;
  noteFontSize = 16;
  dateFontSize= 26;
  titleFontSize = 20;
  locationFontSize = 18;
  lastRowMarginTop = '3%';
  lastRowMarginBottom = '5%';
  lastRowFontSize = 20;
} else {
  cardWidth = '100%';
  likeMargin = '30%';
  imageHeight = 180;
  noteFontSize = 12;
  dateFontSize= 22;
  titleFontSize = 16;
  locationFontSize = 14;
  lastRowMarginTop = 0;
  lastRowMarginBottom = 0;
  lastRowFontSize = 14;
}

export default class DeckSwiperExample extends Component {

  constructor() {
    super();
    this.state = { testStateArray: null, stateCards: [], cardsDefined: false };
  }

  createInformationList() {
    console.log('inside createInformationList')
    if (this.state.testStateArray === null) {
      firebase.database().ref().once('value').then((snapshot) => {
        const informationArray = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          informationArray.push([
            childData.id,
            childData.title,
            childData.info,
            childData.facebookurl,
            childData.time,
            childData.calStarttime,
            childData.calEndtime,
            childData.location,
            childData.more,
          ]);
        });
        this.setState({ testStateArray: informationArray });
        console.log('here is testarray: ', this.state.testStateArray[1][2]);
        this.createCards();
      });
    };
  }

  createCards() {
    console.log('inside createCards');
    cards = [
      {
        time: this.state.testStateArray[0][4],
        text: this.state.testStateArray[0][1],
        info: this.state.testStateArray[0][2],
        image: require('../Assets/parasportalmedalen.jpg'),
        url: this.state.testStateArray[0][3],
        location: this.state.testStateArray[0][7],
        more: this.state.testStateArray[0][8],
        calendarInfo: {
          title: this.state.testStateArray[0][1],
          startDate: this.state.testStateArray[0][5],
          endDate: this.state.testStateArray[0][6],
        }
      },
      {
        time: this.state.testStateArray[1][4],
        text: this.state.testStateArray[1][1],
        info: this.state.testStateArray[1][2],
        image: require('../Assets/Bildhyreshus.jpg'),
        url: this.state.testStateArray[1][3],
        location: this.state.testStateArray[1][7],
        more: this.state.testStateArray[1][8],
        calendarInfo: {
          title: this.state.testStateArray[1][1],
          startDate: this.state.testStateArray[1][5],
          endDate: this.state.testStateArray[1][6],
        }
      },
      {
        time: this.state.testStateArray[2][4],
        text: this.state.testStateArray[2][1],
        info: this.state.testStateArray[2][2],
        image: require('../Assets/Rullstolhissliten.jpg'),
        url: this.state.testStateArray[2][3],
        location: this.state.testStateArray[1][7],
        more: this.state.testStateArray[2][8],
        calendarInfo: {
          title: this.state.testStateArray[2][1],
          startDate: this.state.testStateArray[2][5],
          endDate: this.state.testStateArray[2][6],
        }
      },
      {
        time: this.state.testStateArray[3][4],
        text: this.state.testStateArray[3][1],
        info: this.state.testStateArray[3][2],
        image: require('../Assets/SandwishesonatablethebuffeeMINDRE.jpg'),
        // image: require('../Assets/Rullstolhissliten.jpg'),
        url: this.state.testStateArray[3][3],
        location: this.state.testStateArray[1][7],
        more: this.state.testStateArray[3][8],
        calendarInfo: {
          title: this.state.testStateArray[3][1],
          startDate: this.state.testStateArray[3][5],
          endDate: this.state.testStateArray[3][6],
        }
      },
    ];
    console.log('Här är someCards: ', cards);
    this.setState({ stateCards: cards });
    this.setState({ cardsDefined: true })
  };

  createContent() {
    if (this.state.cardsDefined) {
      return (
        <DeckSwiper
          ref={(c) => this._deckSwiper = c}
          dataSource={cards}
          renderItem={item =>

            <Card style={styles.containerStyle}>
              <CardItem style={{}} >
                <Left>
                  <Body>
                    <Text style={styles.dateStyle}>{item.time}</Text>
                    <Text style={styles.titleStyle}>{item.text}</Text>
                    <Text note style={styles.infoStyle}>{item.info}
                      <Text> </Text>
                      <Text style={styles.linkStyle} onPress={() => Linking.openURL(item.url)}>{item.more}</Text>
                    </Text>
                    <Text style={styles.locationStyle}>{item.location}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: imageHeight, flex: 1 }} source={item.image} />
              </CardItem>
              <CardItem style={{ marginTop: lastRowMarginTop, marginBottom: lastRowMarginBottom}}>
                <Icon name="add-circle" style={{ color: '#008ccf' }}
                  onPress={() => this.addToCalendar(item.calendarInfo)} />
                <Text style={{ fontSize: lastRowFontSize }} onPress={() => this.addToCalendar(item.calendarInfo)}>Lägg till i kalender
                </Text>
                <Text style={{ marginLeft: likeMargin, fontSize: lastRowFontSize  }} onPress={() => Linking.openURL(item.url)} >Gilla </Text>
                <Icon onPress={() => Linking.openURL(item.url)} name="logo-facebook" style={{ color: '#4266b2', marginLeft: 5 }} />
              </CardItem>

            </Card>
          }
        />
      )
    }
  }

  addToCalendar(calendarEvent) {
    console.log('in addToCalendar');
    AddCalendarEvent.presentEventDialog(calendarEvent);
  }

  unusedFunction = (dummyString) => {
    console.log(dummyString);
  }

  render() {
    return (
      <Container >
        {this.createInformationList()}
        <View style={{ height: 150 }}>
          <CalendarHeader callbackFromHeader={this.unusedFunction} />
        </View>
        <BackgroundImage>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ position: 'absolute', flexDirection: 'column', width: cardWidth, marginTop: -30 }}>
              <View styles={{ position: 'absolute', flexDirection: 'column', width: 500 }}>
                {this.createContent()};
            </View>
            </View>
          </View>
          <View style={styles.buttonViewStyle}>
            <TouchableOpacity iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
              <Image source={swipeForward} style={styles.buttonStyle} />
            </TouchableOpacity>
          </View>
        </BackgroundImage>
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    // borderRadius: 50,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
    // alignItems: 'center'
  },
  buttonViewStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'flex-end',
    position: "absolute",
    padding: 10,
    justifyContent: 'center',
    right: -10,
    top: '30%'
  },
  buttonStyle: {
    height: 110,
    width: 70
  },
  dateStyle: {
    fontSize: dateFontSize,
    fontWeight: 'bold'
  },
  titleStyle: {
    fontSize: titleFontSize,
    marginTop: '1%'
  },
  infoStyle: { 
    fontSize: noteFontSize, 
    marginTop: '1%', 
    marginBottom: '1%' 
  },
  locationStyle: {
    fontSize: locationFontSize,
    marginBottom: '1%'
  },
  linkStyle: {
    textDecorationLine: 'underline',
    color: '#008ccf',
    fontSize: noteFontSize,
  }
};

