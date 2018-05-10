// import React, { Component } from 'react';
// import { Image } from 'react-native';
// import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';


var custom = require('../101.jpg');
var pistmap = require('../Assets/pistmap.png');

// export default class Carlendar extends Component {
//   render() {
//     return (
//       <Container>
//         <Header />
//         <Content>
//           <Card style={{flex: 0}}>
//             <CardItem>
//               <Left>
//                 <Thumbnail source={pistmap} />
//                 <Body>
//                   <Text>Seminarium 1</Text>
//                   <Text note>Juni 15, 2018</Text>
//                 </Body>
//               </Left>
//             </CardItem>
//             <CardItem>
//               <Body>
//                 <Image source={custom} style={{height: 200, width: 200}}/>
//                 <Text>
//                   Kom och lyssna på allt om tillgänglighet!
//                 </Text>
//               </Body>
//             </CardItem>
//             <CardItem>
//               <Left>
//                 <Button transparent textStyle={{color: '#87838B'}}>
//                   <Icon name="logo-facebook" />
//                   <Text>1,926 likes</Text>
//                 </Button>
//               </Left>
//             </CardItem>
//           </Card>
//         </Content>
//       </Container>
//     );
//   }
// }

import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Container, Content, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button, Right } from 'native-base';

import CalendarHeader from '../CalendarHeader';
import BackgroundImage from './bg';
const url = 'https://www.facebook.com/events/428188540972908/';
const cards = [
  {
    text: 'Seminarium 1',
    name: 'lägg till i kalender',
    dela: 'dela facebook',
    image: require('../Assets/Almedalen.png'),
  },
  {
    text: 'Seminarium 2',
    name: 'lägg till i kalender',
    dela: 'dela facebook',
    image: require('../Assets/people.jpg'),
  },
  {
    text: 'Seminarium 3',
    name: 'lägg till i kalender',
    dela: 'dela facebook',
    image: require('../Assets/almedalen2018.jpg')
  },
];
export default class DeckSwiperExample extends Component {
  render() {
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
              
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>För andra året i rad genomförs Tillgänglighetsarenan. Syftet är att lyfta tillgänglighet och utformning i samhällsdebatten och ge frågorna en tydlig hemvist i Almedalen.</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 200, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="add-circle" style={{ color: 'blue' }} />
                  <Text>{item.name} </Text>

                  
                  <Text style={{ marginLeft: 10}} onPress={() => Linking.openURL(url)} >{item.dela} </Text>
                  <Icon style={{ marginLeft: 55}}  onPress={() => Linking.openURL(url)} name="logo-facebook" style={{ color: 'blue' }} />

                </CardItem>
              </Card>
            }
          />
        </View>
        </View>
        <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 10, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
          <Button style={{ backgroundColor: '#4A90E2'}} iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Föregående</Text>
          </Button>
          <Button style={{ backgroundColor: '#4A90E2'}} iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            
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