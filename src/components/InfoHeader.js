import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image, View, ImageBackground } from 'react-native';
import BackgroundImage from './pages/arenalogo';

const headerHeight = 0;

if (Platform.isPad) {
    headerHeight = 240;
} else {
    headerHeight = 150;
}

export default class InfoHeader extends Component {

    render() {
        return (
            <BackgroundImage>
                <Header style={{ backgroundColor: 'transparent', height: headerHeight }}>
                    <Left>
                        <Button transparent onPress={Actions.pop}>
                            <Icon name='arrow-back' style={{ color: "white" }} />
                        </Button>
                    </Left>
                    <Body>
                        {/* <Title style={{ color: "white" }}>Calendar</Title> */}
                        {/* <Image source={require('./Assets/logon.png')} style={{width:120, height:60}} />
                     */}
                    </Body>
                    <Right>
                    </Right>
                </Header>
            </BackgroundImage>
        );
    }
}
