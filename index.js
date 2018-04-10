/*import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapExample extends Component {
    render() {
        return (
            <MapView
                provider={ PROVIDER_GOOGLE }
                style={ styles.container }
                initialRegion={{
                    latitude: 57.639572,
                    longitude: 18.294661,
                    latitudeDelta: 0.0002,
                    longitudeDelta: 0.015
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
});

AppRegistry.registerComponent('MapExample', () => MapExample);*/


import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('MapExample', () => App);
