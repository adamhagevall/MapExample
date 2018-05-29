import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text, StyleProvider} from 'native-base';
import { Actions } from 'react-native-router-flux';

import BackgroundImage from './pages/BackgroundImage';

import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';


export default class FooterEx extends Component {

    constructor() {
        super();
        this.state = { 
            activeTabName: 'map', 
            tabShown: true 
        };
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
            <StyleProvider style={getTheme(commonColor)}>
           
            <Footer >
            <BackgroundImage>
                <FooterTab />
                   
                </BackgroundImage>
            </Footer>
            
            </StyleProvider>
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

