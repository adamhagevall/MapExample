import React, { Component } from 'react';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class NewHeader extends Component {
    render() {
        return (
            <Header>
                <Left>
                </Left>
                <Body>
                    <Title>Visby Pistkarta</Title>
                </Body>
                <Right>
                    <Button transparent onPress={Actions.settings}>
                        <Icon name='settings' />
                    </Button>
                </Right>
            </Header>
        );
    }
}
module.export = NewHeader;