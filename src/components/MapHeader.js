import React, { Component } from 'react';
import { Image, View, ImageBackground, StyleSheet } from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title, Dimensions, Content, Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SearchBar from './SearchBar';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
var bild = require('./Assets/fadedmap.jpg');
import BackgroundImage from './pages/BackgroundImage';
const backgroundImage = require('./Assets/fadedmap.jpg');

import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'



const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [
    'Cancel',
    {
        component: <Image source={require('./Assets/green.png')} style={{ width: 300, height: 50 }} />,
        height: 80,
    },
    {
        component: <Image source={require('./Assets/blue.png')} style={{ width: 300, height: 50 }} />,
        height: 80,
    },
    {
        component: <Image source={require('./Assets/red.png')} style={{ width: 300, height: 50 }} />,
        height: 80,
    },
    {
        component: <Image source={require('./Assets/svart.png')} style={{ width: 300, height: 50 }} />,
        height: 80,
    }


]
const title = <Text style={{ color: 'crimson', fontSize: 18 }}>Hur vill du anpassa din rutt?</Text>




export default class MapHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runRoute: 'white',
            selected: 1,
        }
    }
    sendToParent(runIndex) {
        this.props.callbackFromParent(runIndex);
      }

    showActionSheet() {
        this.actionSheet.show()
    }
    getActionSheetRef = ref => (this.actionSheet = ref)

    handlePress = index => { this.setState({ selected: index }), this.handleColor(), this.sendToParent(index) }

    handleColor() {

        if (this.state.selected === 1) {
            console.log('red')
            this.setState({ runRoute: 'green' })
        }
        if (this.state.selected === 2) {
            console.log('green')
            this.setState({ runRoute: 'blue' })
        }
        if (this.state.selected === 3) {
            console.log('green')
            this.setState({ runRoute: 'red' })
        }
        if (this.state.selected === 4) {
            console.log('green')
            this.setState({ runRoute: 'black' })
        }
    }

    render() {
        const { runRoute, selected } = this.state
        const selectedText = options[selected].component || options[selected]


        return (
            <BackgroundImage>
                    <Header span style={{ backgroundColor: 'transparent', height: 150 }}>

                        <Left>
                            <Button transparent onPress={Actions.information}>
                                <Icon name='information-circle' style={{ color: "white" }} />
                            </Button>
                            <Button transparent onPress={() => { this.showActionSheet() }}>>
                        <Icon name='walk' style={{ color: runRoute }} />
                            </Button>
                            <Image source={require('./Assets/nyrullstol.png')} style={{ width: 70, height: 70, marginLeft: 70, marginTop: -55 }} />
                            {/* <Image source={require('./Assets/windrose2.png')} style={{width:80, height:80, marginTop: -60, marginLeft: 270}} />
                            */}

                        </Left>
                        <Body >
                            {/*                     
                    <Title style={{ color: "white" }} >PISTKARTA</Title> */}
                            <Image source={require('./Assets/logon.png')} style={{ width: 130, height: 80, marginLeft: 20 }} />

                        </Body>
                        <Right>
                            <Button transparent onPress={Actions.feedback}>
                                <Icon name='text' style={{ color: "white" }} />
                            </Button>
                            <Button transparent onPress={Actions.calendar} >
                                <Icon name='calendar' style={{ color: "white" }} />
                            </Button>
                            {/* <Image source={require('./Assets/rauka.png')} style={{width:50, height:50}} />
                     */}
                        </Right>

                    </Header>
                    <ActionSheet
          ref={this.getActionSheetRef}
          title={title}
          message="Här väljer du vilken färg på vägarna som ruttplaneraren ska anpassa sig till. Kan du t.ex. som mest tänka dig röda vägar men inte svarta, välj röd "
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress= {this.handlePress}

        />

            </BackgroundImage>


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