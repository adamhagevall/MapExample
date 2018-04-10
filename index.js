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

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapExample extends Component {
    
    constructor() {
      super();

      this.state = {
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          },
        (error) => console.log(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = navigator.geolocation.watchPosition(
          position => {
            this.setState({
              region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            });
          }

        );
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
      return (
        <MapView
          provider={ PROVIDER_GOOGLE }
          style={ styles.container }
          showsUserLocation={ true }
          region={ this.state.region }
          onRegionChange={ region => this.setState({region}) }
          onRegionChangeComplete={ region => this.setState({region}) }
        >
          <MapView.Marker
            coordinate={ this.state.region }
          />
        </MapView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    }
  });
  
  AppRegistry.registerComponent('MapExample', () => MapExample);