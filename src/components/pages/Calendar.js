import firebase from 'firebase';
import React, { Component } from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';
import { Container, Content, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Right } from 'native-base';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import CalendarHeader from '../CalendarHeader';
import BackgroundImage from './bg';
var custom = require('../101.jpg');
var pistmap = require('../Assets/pistmap.png');
const swipeForward = require('../101.jpg');

const url = 'https://www.facebook.com/events/428188540972908/';
const cards = [];

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
            childData.calEndtime
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
        time: '3 juli, 14.00-14.45',
        // text: 'Bygg tillgängligt tjäna mer!',
        text: this.state.testStateArray[1][1],
        name: 'Lägg till i kalender',
        info: 'Det finns betydande sociala och ekonomiska vinster i att tillgänglighetsanpassa fysiska miljöer. Med avstamp i OS och Paralympics i Stockholm 2026 lyfts frågan vad ett Paralympics i en storstad kan ge för effekter för en tillgänglig stad? Skulle Sverige vinna på att stå som värd för ett Paralympics?',
        dela: 'Dela',
        image: require('../Assets/parasportalmedalen.jpg'),
        url: 'https://www.facebook.com/events/428188540972908/',
        calendarInfo: {
          title: 'Bygg tillgängligt tjäna mer!',
          startDate: '2018-07-03T12:00:00.000Z',
          endDate: '2018-07-03T12:45:00.000Z'
        }
      },
      {
        time: '3 juli, 15.00-15.45',
        text: 'Kan miljonprogrammet lösa de bostadspolitiska utmaningarna?',
        name: 'Lägg till i kalender',
        info: 'Sverige har tre bostadspolitiska utmaningar: bostadsbristen, ett omfattande renoveringsbehov i det befintliga flerbostadshusbeståndet och bristen på tillgängliga bostäder för den växande andelen äldre. Kan våningspåbyggnad på trevåningshusen från miljonprogrammet lösa alla tre utmaningar samtidigt?',
        dela: 'Dela',
        image: require('../Assets/Bildhyreshus.jpg'),
        url: 'https://www.facebook.com/events/428188540972908/',
        calendarInfo: {
          title: 'Kan miljonprogrammet lösa de bostadspolitiska utmaningarna?',
          startDate: '2018-07-03T13:00:00.000Z',
          endDate: '2018-07-03T13:45:00.000Z'
        }
      },
      {
        time: '3 juli, 15.00-15.45',
        text: 'Kan miljonprogrammet lösa de bostadspolitiska utmaningarna?',
        name: 'Lägg till i kalender',
        info: 'Sverige har tre bostadspolitiska utmaningar: bostadsbristen, ett omfattande renoveringsbehov i det befintliga flerbostadshusbeståndet och bristen på tillgängliga bostäder för den växande andelen äldre. Kan våningspåbyggnad på trevåningshusen från miljonprogrammet lösa alla tre utmaningar samtidigt?',
        dela: 'Dela',
        image: require('../Assets/Bildhyreshus.jpg'),
        url: 'https://www.facebook.com/events/428188540972908/',
        calendarInfo: {
          title: 'Kan miljonprogrammet lösa de bostadspolitiska utmaningarna?',
          startDate: '2018-07-03T13:00:00.000Z',
          endDate: '2018-07-03T13:45:00.000Z'
        }
      },
      {
        time: '16.00-16.45',
        text: 'Sverige - tillgängligt för alla?!',
        name: 'Lägg till i kalender',
        info: 'I höst går Sverige till allmänna val. Tillgänglighetsarenan arrangerar appellstaffet mellan riksdagspartierna. I korta appeller beskriver partierna hur de ser på allas möjlighet att ta sig fram i den fysiska miljön och om de är beredda att påverka utvecklingen.',
        dela: 'Dela',
        image: require('../Assets/Rullstolhissliten.jpg'),
        url: 'https://www.facebook.com/events/428188540972908/',
        calendarInfo: {
          title: 'Sverige - tillgängligt för alla?!',
          startDate: '2018-07-03T14:00:00.000Z',
          endDate: '2018-07-03T14:45:00.000Z'
        }
      }
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

              <CardItem style={{  }} >
                <Left>
                  <Body>
                  <Text style={styles.clockStyle}>{item.time}</Text>
                          <Text style={styles.infoStyle}>{item.text}</Text>
                          <Text note style={styles.infoStyle} >{item.info}</Text>
                          <Text style={styles.linkStyle}>Läs mer</Text>


                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 200, flex: 1 }} source={item.image} />
              </CardItem>
              <CardItem>
                <Icon name="add-circle" style={{ color: '#008ccf' }}
                  onPress={() => this.addToCalendar(item.calendarInfo)} />
                <Text onPress={() => this.addToCalendar(item.calendarInfo)}>{item.name}
                </Text>
                <Text style={{ marginLeft: 10 }} onPress={() => Linking.openURL(item.url)} >{item.dela} </Text>
                <Icon style={{ marginLeft: 55 }} onPress={() => Linking.openURL(item.url)} name="logo-facebook" style={{ color: '#008ccf' }} />

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

  render() {
    return (

      <Container >
        {this.createInformationList()}
        <View style={{ height: 150 }}>
          <CalendarHeader />
        </View>
        <BackgroundImage>
          <View style={{ position: 'absolute', flexDirection: 'column', width: 375, marginTop: -40 }}>


            <View styles={{ position: 'absolute', flexDirection: 'column', width: 500 }}>
              
              {this.createContent()};
        </View>
          </View>
          {/* <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: -10, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
            <Button style={{ backgroundColor: '#008ccf' }} iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
              <Icon name="arrow-back" />
              <Text>Föregående</Text>
            </Button>
            <Button style={{ backgroundColor: '#008ccf' }} iconRight onPress={() => this._deckSwiper._root.swipeLeft()}>

              <Text>Nästa </Text>
              <Icon name="arrow-forward" />
            </Button>

          </View> */}
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
    borderRadius: 50,
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
  },
  buttonViewStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'flex-end',
    position: "absolute",
    justifyContent: 'center',
    padding: 15,
    right: -10,
    top: '30%'
  },
  buttonStyle: {
    height: 110,
    width: 30,
    opacity: 0.3
  },
  clockStyle: {
    fontSize: 22,
    fontWeight: 'bold', 
    textAlign: 'center',
  },
  infoStyle: {

     textAlign: 'center',

  },
  titleStyle: {

    textAlign: 'center',

  },
  linkStyle: {
    textDecorationLine: 'underline', 
    color: '#008ccf',

    textAlign: 'center',

  }

};

