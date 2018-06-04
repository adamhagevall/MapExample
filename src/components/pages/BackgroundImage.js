
var bild = require('../Assets/background.jpg');
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    View
} from 'react-native';

export default class BackgroundImage extends Component {

    render() {
        return (
            <ImageBackground source={bild}
                style={styles.backgroundImage}>
                {this.props.children}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null

    },
    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 32
    }
});