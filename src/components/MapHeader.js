import React, { Component } from 'react';
import {Image} from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class MapHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: '#4A90E2' }}>
                <Left>
                <Button transparent onPress={Actions.information}>
                        <Icon name='information-circle' style={{ color: "white" }}/>
                    </Button>
                    <Button transparent onPress={Actions.addToCal}>
                        <Icon name='add' style={{ color: "white" }} />
                    </Button>
                    
                </Left>
                <Body >
                    
                    <Title style={{ color: "white" }} >PISTKARTA</Title>

                </Body>
                <Right>
                <Button transparent onPress={Actions.feedback}>
                        <Icon name='text' style={{ color: "white" }}/>
                    </Button>
                    <Button transparent onPress={Actions.calendar}>
                        <Icon name='calendar' style={{ color: "white" }} />
                    </Button>
                    {/*  */}
                    <Image source={require('./Assets/rauka.png')} style={{width:50, height:50}} />
                    
                </Right>
            </Header>
        );
    }
}

