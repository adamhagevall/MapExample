import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Right } from 'native-base';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

// import PushNotification from 'react-native-push-notification'; //push

import CalendarHeader from '../CalendarHeader';
import BackgroundImage from './bg';

var custom = require('../101.jpg');
var pistmap = require('../Assets/pistmap.png');

const url = 'https://www.facebook.com/events/428188540972908/';
const cards = [
  {
    time: '14.00-14.45',
    text: 'Bygg tillgängligt tjäna mer!',
    name: 'lägg till i kalender',
    info: 'Det finns betydande sociala och ekonomiska vinster i att tillgänglighetsanpassa fysiska miljöer. Med avstamp i OS och Paralympics i Stockholm 2026 lyfts frågan vad ett Paralympics i en storstad kan ge för effekter för en tillgänglig stad? Skulle Sverige vinna på att stå som värd för ett Paralympics?',
    dela: 'Dela',
    image: require('../Assets/parasportalmedalen.jpg'),
    calendarInfo: {
      title: 'Bygg tillgängligt tjäna mer!',
      startDate: '2018-07-03T12:00:00.000Z',
      endDate: '2018-07-03T12:45:00.000Z'
  	}
  },
  {
    time: '15.00-15.45',
    text: 'Kan miljonprogrammet lösa de bostadspolitiska utmaningarna?',
    name: 'lägg till i kalender',
    info: 'Sverige har tre bostadspolitiska utmaningar: bostadsbristen, ett omfattande renoveringsbehov i det befintliga flerbostadshusbeståndet och bristen på tillgängliga bostäder för den växande andelen äldre. Kan våningspåbyggnad på trevåningshusen från miljonprogrammet lösa alla tre utmaningar samtidigt?',
    dela: 'Dela',
    image: require('../Assets/Bildhyreshus.jpg'),
    calendarInfo: {
      title: 'Kan miljonprogrammet lösa de bostadspolitiska utmaningarna?',
      startDate: '2018-07-03T13:00:00.000Z',
      endDate: '2018-07-03T13:45:00.000Z'
    }
  },
  {
    time: '16.00-16.45',
    text: 'Sverige - tillgängligt för alla?!',
    name: 'lägg till i kalender',
    info: 'I höst går Sverige till allmänna val. Tillgänglighetsarenan arrangerar appellstaffet mellan riksdagspartierna. I korta appeller beskriver partierna hur de ser på allas möjlighet att ta sig fram i den fysiska miljön och om de är beredda att påverka utvecklingen.',
    dela: 'Dela',
    image: require('../Assets/Rullstolhissliten.jpg'),
    calendarInfo: {
      title: 'Sverige - tillgängligt för alla?!',
      startDate: '2018-07-03T14:00:00.000Z',
      endDate: '2018-07-03T14:45:00.000Z'
    }
  },
];

// PushNotification.localNotificationSchedule({
//   message: "My Notification Message", // (required)
//   date: new Date(Date.now() + (30 * 1000)) // in 60 secs
// });


// addToCalendar(calendarEvent) {
//   console.log('addToCalendar');
//   AddCalendarEvent.presentEventDialog(calendarEvent);
// }

// componentDidMount() {
//   this.createInformationList();
// }; 

export default class DeckSwiperExample extends Component {


  addToCalendar(calendarEvent) {
    console.log('in addToCalendar');
    AddCalendarEvent.presentEventDialog(calendarEvent);
    // if (calendarEvent) {
    //   console.warn(JSON.stringify(calendarEvent));
    // } else {
    //   console.warn('dismissed');
    // }
  }

  render() { 
    // this.createInformationList();
    // console.log("Current stateArray");

    return (
      <Container >

        <View style={{height: 150}}>
        <CalendarHeader />
        </View>
        <BackgroundImage>
        <View style={{ position: 'absolute', flexDirection: 'column', width: 375, marginTop: -40 }}>
         
        
        <View styles={{position: 'absolute', flexDirection: 'column', width: 500}}>
          <DeckSwiper
          ref={(c) => this._deckSwiper = c}
            dataSource={cards}
             
                  
            renderItem={item =>             
              <Card style={styles.containerStyle}> 

                <CardItem style={{ height: 200 }} >
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                    <Text>{item.time}</Text>
                      <Text>{item.text}</Text>
                      <Text note>{item.info}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 200, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="add-circle" style={{ color: '#008ccf' }} 
				onPress={() => this.addToCalendar(item.calendarInfo)}/>
                  <Text onPress={() => this.addToCalendar(item.calendarInfo)}>{item.name} 
</Text>

                  
                  <Text style={{ marginLeft: 10}} onPress={() => Linking.openURL(url)} >{item.dela} </Text>
                  <Icon style={{ marginLeft: 55}}  onPress={() => Linking.openURL(url)} name="logo-facebook" style={{ color: '#008ccf' }} />

                </CardItem>
              </Card>
            }
          />
        </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: -10, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button style={{ backgroundColor: '#008ccf'}} iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Föregående</Text>
          </Button>
          <Button style={{ backgroundColor: '#008ccf'}} iconRight onPress={() => this._deckSwiper._root.swipeLeft()}>
            
            <Text>Nästa </Text>
            <Icon name="arrow-forward" />
          </Button>
          
        </View>
        </BackgroundImage>
      </Container>
    )}

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
  }
};