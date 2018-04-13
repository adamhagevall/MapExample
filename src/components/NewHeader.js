import React, { Component } from 'react';
import { Container, Content, ListItem, Text, CheckBox, Header, Left, Right, Button, Icon, Body, Title } from 'native-base';


export default class NewHeader extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Hejhej</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
            </Container>
        );
    }
}