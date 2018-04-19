import React, { Component } from 'react';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class InfoHeader extends Component {
    render() {
        return (
            <Header>
                <Left>
                </Left>
                <Body>
                    <Title>Information</Title>
                </Body>
                <Right>
                <Button transparent onPress={Actions.calendar}>
                        <Icon name='calendar' />
                    </Button>
                </Right>
            </Header>
        );
    }
}
