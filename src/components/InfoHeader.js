import React, { Component } from 'react';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {Image, View, ImageBackground } from 'react-native';

import BackgroundImage from './pages/arenalogo';

export default class InfoHeader extends Component {
    render() {
        return (
            <BackgroundImage>
            <Header style={{ backgroundColor: 'transparent', height: 150 }}>
          
                <Left>
                <Button transparent onPress={Actions.pop}>
                        <Icon name='arrow-back' style={{ color: "white" }}/>
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
