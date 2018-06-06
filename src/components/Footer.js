import React, { Component } from 'react';
import { Footer, StyleProvider } from 'native-base';
import BackgroundImage from './pages/BackgroundImage';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

export default class FooterEx extends Component {

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Footer style={{ height: '4%' }}>
                    <BackgroundImage>
                    </BackgroundImage>
                </Footer>
            </StyleProvider>
        );
    }
}