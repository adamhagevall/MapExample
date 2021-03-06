import React, { Component } from "react";
import { Container, Header, Button, Content, Text, View, Icon, Fab } from "native-base";
import { StyleSheet, Image, Dimensions, Platform } from 'react-native'
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'

const sheetFontSize = 0;
const titleFontSize = 0;
const acceptFontSize = 0;
const fabPositionFactor = 0;

if (Platform.isPad) {
  sheetFontSize = 16;
  titleFontSize = 24;
  fabPositionFactor = 0.2;
} else {
  sheetFontSize = 12;
  titleFontSize = 20;
  fabPositionFactor = 0.3;
}

const { width, height } = Dimensions.get('window');
const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const title = <Text style={{ color: 'crimson', fontSize: titleFontSize }}>Hur vill du anpassa din rutt?</Text>
const message = <Text style={{ color: 'grey', textAlign: 'justify', fontSize: sheetFontSize, marginRight: '4%', marginLeft: '4%', marginBottom: '1%', marginTop: '-1%' }}>Här väljer du vilken färg på vägarna som ruttplaneraren ska anpassa sig till. Kan du till exempel som mest tänka dig röda vägar men inte svarta, välj då röd inställning.</Text>
const options = [
  'Cancel',
  {
    component: <Image source={require('../Assets/green.png')} style={{ width: 300, height: 50 }} />,
    height: 65,
  },
  {
    component: <Image source={require('../Assets/blue.png')} style={{ width: 300, height: 50 }} />,
    height: 65,
  },
  {
    component: <Image source={require('../Assets/red.png')} style={{ width: 300, height: 50 }} />,
    height: 65,
  },
  {
    component: <Image source={require('../Assets/svart.png')} style={{ width: 300, height: 50 }} />,
    height: 65,
  },
  // {
  //   component: <Text style={{ color: 'black', fontSize: 15 }}>Välj bland förinställda motionsrutter --> </Text>,
  //   height: 40,
  // }
]

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

  onButtonPress() {
    { this.handlePress }
  }

  handlePress = index => { this.setState({ selected: index }), this.handleColor(), this.sendToParent(index) }

  handleColor() {
    if (this.state.selected === 1) {
      this.setState({ selectedColor: '#5aa73f' })
    }
    if (this.state.selected === 2) {
      this.setState({ selectedColor: '#008ccf' })
    }
    if (this.state.selected === 3) {
      this.setState({ selectedColor: '#ff2232' })
    }
    if (this.state.selected === 4) {
      this.setState({ selectedColor: 'black' })
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
            // style={{ backgroundColor: selectedColor, marginBottom: 200 }}
            style={{ backgroundColor: selectedColor, marginBottom: height*fabPositionFactor}}
            // position="bottomRight"
            onPress={() => { this.showActionSheet() }}>
            <Image source={require('../Assets/directions2.png')} style={{ width: 25, height: 25 }} />
          </Fab>
          <ActionSheet
            ref={this.getActionSheetRef}
            title={title}
            //message="Här väljer du vilken färg på vägarna som ruttplaneraren ska anpassa sig till. Kan du t.ex. som mest tänka dig röda vägar men inte svarta, välj röd "
            message={message}
            options={options}
            cancelButtonIndex={CANCEL_INDEX}
            destructiveButtonIndex={DESTRUCTIVE_INDEX}
            onPress={this.handlePress}
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
    flexDirection: 'row'
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