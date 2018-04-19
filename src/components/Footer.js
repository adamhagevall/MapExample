import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class FooterEx extends Component {

    constructor() {
        super();
        this.state = { activeTabName: 'map', tabShown: true };
    }

    tabAction(tab) {
        this.setState({ activeTabName: tab });
        if (tab === 'map') {
            Actions.map();
        } else if (tab === 'information') {
            Actions.information();
        } else {
            this.setState({ tabShown: false })
        }
    }

    render() {
        return (
            <Footer >
                <FooterTab>
                    <Button vertical active={(this.state.activeTabName === 'map') ? true : ""} onPress={() => { this.tabAction('map') }}>
                        <Icon active name="navigate" />
                        <Text>Navigate</Text>
                    </Button>
                    <Button vertical active={(this.state.activeTabName === 'information') ? true : ""} onPress={() => { this.tabAction('information') }}>
                        <Icon name="person" />
                        <Text>Information</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
    //     state = { onFirstPage: null }; //NYTT

    //     onButtonPress = () => {
    //                if (this.state.onFirstPage) {
    //                    this.setState({ onFirstPage: false });
    //                    {this.renderContent()}
    //                } else {
    //                    this.setState({ onFirstPage: true });
    //                    {this.renderContent()}
    //                }
    //                };

    //                renderMap() {
    //                 return (
    //                     console.log(this.state.onFirstPage),
    //                  <Map/>
    //                 );
    //             }

    //     renderContent() {
    //     switch (this.state.onFirstPage) {
    //         case true:
    //         return (
    //             <LibraryList />
    //             );
    //         case false: 
    //         return (
    //                 <Map />
    //             );

    //         default: 
    //             return (
    //             <View>
    //             </View>
    //             );
    //     }
    // }

