import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';


const coordinates = [
  {
    latitude: 18.2954925,
    longitude: 57.6408186,
  },
  {
    latitude: 18.2946771,
    longitude: 57.6409392,
  },
];

const GOOGLE_MAPS_APIKEY = 'AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ';

var custom = require('./101.jpg');
var mapStyle = require('./mapStyle.json');

class Map extends Component {
    render() {
        return (
            <MapView

                provider={ PROVIDER_GOOGLE }
                style={ styles.container }
                initialRegion={{
                    latitude: 57.639572,
                    longitude: 18.294661,
                    latitudeDelta: 0.00012,
                    longitudeDelta: 0.010
                }}
                >
            <MapView.Marker
                style= {{height: 1}}
                coordinate={{ longitude: 18.292853, latitude: 57.641380 }}
                title={'Tillgänglighetsarenan'}
                //image={custom}
                pinColor={'blue'}
              />

            <MapView.Marker coordinate={coordinates[0]} />
            <MapView.Marker coordinate={{ longitude: 18.2946771, latitude: 57.6409392 }} />
            <MapViewDirections
              origin={{ longitude: 18.2925582, latitude: 57.6354749 }}
              destination={{ longitude: 18.2982713, latitude: 57.6384871 }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={30}
              strokeColor="blue"
            />
            </MapView>
            
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
});

// AppRegistry.registerComponent('MapExample', () => MapExample);


// import React, { Component } from 'react';
// import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// let { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 0;
// const LONGITUDE = 0;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// class Map extends Component {
    
//     constructor() {
//       super();

//       this.state = {
//         region: {
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }
//       };
//     }

//     componentDidMount() {
//         navigator.geolocation.getCurrentPosition(
//           position => {
//             this.setState({
//               region: {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//                 latitudeDelta: LATITUDE_DELTA,
//                 longitudeDelta: LONGITUDE_DELTA,
//               }
//             });
//           },
//         (error) => console.log(error.message),
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//         );
//         this.watchID = navigator.geolocation.watchPosition(
//           position => {
//             this.setState({
//               region: {
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//                 latitudeDelta: LATITUDE_DELTA,
//                 longitudeDelta: LONGITUDE_DELTA,
//               }
//             });
//           }

//         );
//     }

//     componentWillUnmount() {
//       navigator.geolocation.clearWatch(this.watchID);
//     }

//     render() {
//       return (
//         <MapView
//           provider={ PROVIDER_GOOGLE }
//           style={ styles.container }
//           showsUserLocation={ true }
//           region={ this.state.region }
//           onRegionChange={ region => this.setState({region}) }
//           onRegionChangeComplete={ region => this.setState({region}) }
//         >
//           <MapView.Marker
//             coordinate={ this.state.region }
            
//           />
        //   <MapView.Marker
        //     coordinate={{ longitude: 18.292853, latitude: 57.641380 }}
        //     title={'Tillgänglighetsarenan'}
        //     pinColor={'blue'}
        //   />
        // </MapView>
//       );
//     }
//   }

//   const styles = StyleSheet.create({
//     container: {
//       height: '100%',
//       width: '100%',
//     }
//   });

  export default Map;