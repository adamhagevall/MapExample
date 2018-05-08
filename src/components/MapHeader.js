import React, { Component } from 'react';
import {Image, View, ImageBackground } from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title, Dimensions, Content, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SearchBar from './SearchBar';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
var bild = require('./Assets/fadedmap.jpg');
import BackgroundImage from './pages/BackgroundImage';
const backgroundImage = require('./Assets/fadedmap.jpg');




export default class MapHeader extends Component {
    render() {
        return (
            <BackgroundImage>
            <Header span style={{ backgroundColor: 'transparent', height: 150 }}>
              
                <Left>
                <Button transparent onPress={Actions.information}>
                        <Icon name='information-circle' style={{ color: "white" }}/>
                    </Button>
                    {/* <Button transparent onPress={Actions.addToCal}>
                        <Icon name='add' style={{ color: "white" }} />
                    </Button> */}
                    
                </Left>
                <Body >
{/*                     
                    <Title style={{ color: "white" }} >PISTKARTA</Title> */}
                    <Image source={require('./Assets/logon.png')} style={{width:130, height:80}} />
                    

                </Body>
                <Right>
                <Button transparent onPress={Actions.feedback}>
                        <Icon name='text' style={{ color: "white" }}/>
                    </Button>
                    <Button transparent onPress={Actions.calendar}>
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

