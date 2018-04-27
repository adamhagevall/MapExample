import React, { Component } from 'react';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class CalendarHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: '#4A90E2' }}>
                <Left>
                <Button transparent onPress={Actions.pop}>
                        <Icon name='arrow-back' style={{ color: "white" }}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "white" }}>Calendar</Title>
                </Body>
                <Right>
              
                </Right>
            </Header>
        );
    }
}
