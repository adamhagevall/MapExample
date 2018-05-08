import React, { Component } from 'react';
import { Image }from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

import BackgroundImage from './pages/BackgroundImage';
var info = require('./Assets/information.jpg');


export default class InfoHeader extends Component {
    render() {
        return (
            <BackgroundImage>
            <Header  style={{ backgroundColor: '#4A90E2', height: 150 }}>
                <Left>
                <Button transparent onPress={Actions.pop}>
                        <Icon name='arrow-back' style={{ color: "white" }}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "white" }}>Information</Title>
                </Body>
                <Right>
                <Button transparent onPress={Actions.calendar}>
                        <Icon name='calendar' style={{ color: "white" }}/>
                    </Button>
                </Right>
            </Header>
            </BackgroundImage>
        );
    }
}
