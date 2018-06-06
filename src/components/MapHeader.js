import React, { Component } from 'react';
import { Image, View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title, Content, Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SearchBar from './SearchBar';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
var bild = require('./Assets/fadedmap.jpg');
import BackgroundImage from './pages/BackgroundImage';
const backgroundImage = require('./Assets/fadedmap.jpg');

export default class MapHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runRoute: 'white'
        }
        const { width, height } = Dimensions.get('window');
        console.log('height', height);
        console.log('width', width);
        const ratio = width/height;
    }
    render() {
        const { runRoute } = this.state
        
        return (
            <BackgroundImage>
                <Header span style={{ backgroundColor: 'transparent', height: 150}}>
                    <Left>
                        <Button transparent onPress={Actions.information}>
                            <Icon name='information-circle' style={{ color: "white" }} />
                        </Button>
                        {/* <Image source={require('./Assets/nyrullstol.png')} style={{ width: 55, height: 55, marginLeft: 85, marginTop: -4 }} /> ÄLDST */}
                        {/* <Image source={require('./Assets/nyrullstol.png')} style={{ width: 55, height: 55, marginLeft: '70%', marginTop: '-4%', alignItems: 'center'  }} /> */}

                    </Left>
                    <Body style={{ flexDirection: 'row'}}>

                    <Image source={require('./Assets/nyrullstol.png')} style={{ width: 51, height: 50, marginTop: 13}} />

                        {/* <Image source={require('./Assets/logon.png')} style={{ width: 130, height: 80, marginLeft: 20 }} /> ÄLDST */}
                        {/* <Image source={require('./Assets/logon.png')} style={{ width: 130, height: 80, marginLeft: '17%', alignItems: 'center' }} /> */}
                        <Image source={require('./Assets/logon.png')} style={{ width: 130, height: 80 }} />

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