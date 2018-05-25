import React, { Component } from "react";
import { Container, Header, Button, Content, Text, View, Icon, Fab } from "native-base";

import { StyleSheet, Image } from 'react-native'
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'
import Action from '../ActionSheet';

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [
  'Cancel',
  {
    component: <Image source={require('../Assets/green.png')} style={{width:300, height:50}} /> ,
    height: 65,
  },
  {
    component: <Image source={require('../Assets/blue.png')} style={{width:300, height:50}} /> ,
    height: 65,
  },
  {
    component: <Image source={require('../Assets/red.png')} style={{width:300, height:50}} /> ,
    height: 65,
  },
  {
    component: <Image source={require('../Assets/svart.png')} style={{width:300, height:50}} /> ,
    height: 65,
  },
  {
    component: <Text style={{ color: 'black', fontSize: 15 }}>Välj bland förinställda motionsrutter --> </Text> ,
    height: 40,
  }


]
const title = <Text style={{ color: 'crimson', fontSize: 18 }}>Hur vill du anpassa din rutt?</Text>


export default class FABExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true',
      selected: 1,
      selectedColor: 'black'
    };
  }

  sendToParent(currentIndex) {
    this.props.callbackFromParent(currentIndex);
  }

  showActionSheet() {
    this.actionSheet.show()
  }
  
  getActionSheetRef = ref => (this.actionSheet = ref)

  onButtonPress(){
    console.log('onButtonPress')
  
    {this.handlePress}
  }

  handlePress = index => { this.setState({ selected: index }), this.handleColor(), this.sendToParent(index)}

  handleColor(){
   
    if (this.state.selected === 1) {
      console.log('red')
      this.setState({ selectedColor: '#5aa73f'})
    }
    if (this.state.selected === 2) {
      console.log('green')
      this.setState({ selectedColor: '#008ccf'})
    }
    if (this.state.selected === 3) {
      console.log('green')
      this.setState({ selectedColor: '#ff2232'})
    }
    if (this.state.selected === 4) {
      console.log('green')
      this.setState({ selectedColor: 'black'})
    }
  } 

  render() {
    const { selected, selectedColor } = this.state
    const selectedText = options[selected].component || options[selected]
  

    return (
      <Container>
        <Header />
        <View style={styles.wrapper}>
          <Fab
            active={false}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: selectedColor, marginBottom: 200 }}
            position="bottomRight"
            onPress={() => { this.showActionSheet()}}>
            
            <Image source={require('../Assets/directions2.png')} style={{width:25, height:25}}/>
             
          </Fab>
       
       
          <ActionSheet
          ref={this.getActionSheetRef}
          title={title}
          message="Här väljer du vilken färg på vägarna som ruttplaneraren ska anpassa sig till. Kan du t.ex. som mest tänka dig röda vägar men inte svarta, välj röd "
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress= {this.handlePress}

        />

        </View>

      </Container>
    );
  }
}



const styles = StyleSheet.create({
  overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.4,
      backgroundColor: '#000',
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    backdrop: {
      flex: 1,
      alignSelf: 'flex-end',
      backgroundColor: 'transparent',
      marginHorizontal: 10,
      marginBottom: 10,
    },
  
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    titleText: {
      color: '#8f8f8f',
      fontSize: 13,
      fontWeight: '600',
    },
    message: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#f9f9f9',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    messageText: {
      color: '#8f8f8f',
      fontSize: 13,
      textAlign: 'center',
    },
  
    optionsContainer: {
      borderRadius: 12,
    },
    options: {
      backgroundColor: '#cecece',
    },
    buttonContainer: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9f9f9',
    },
    buttonTitle: {
      fontSize: 20,
    },
  
    cancelButton: {
      borderRadius: 12,
    },
    cancelTitle: {
      fontWeight: '600',
    },
  })