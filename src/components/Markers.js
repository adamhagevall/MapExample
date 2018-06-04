import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView from 'react-native-maps';

const stairCaseImage = require('./Assets/trappor.png');
const arenaImage = require('./Assets/Arena.png');
const bathroomImage = require('./Assets/WC.png');
const parkingImage = require('./Assets/Parking.png');
const scandicImage = require('./Assets/Scandic.png');

export default class Markers extends Component {
    render() {
        return (
            <View>
                <MapView.Marker
                    coordinate={{ longitude: 18.288779, latitude: 57.640684 }}
                    title={'Tillgänglighetsarenan'}
                >
                    <Image
                        source={arenaImage}
                        style={styles.importantMarkerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.279900, latitude: 57.632387 }}
                    title={'Scandic Visby'}
                >
                    <Image
                        source={scandicImage}
                        style={{ width: 58, height: 12 }}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.2892483, latitude: 57.6402041 }}
                    title={'Tillgängliga toaletter'}
                >
                    <Image
                        source={bathroomImage}
                        style={styles.importantMarkerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.287965, latitude: 57.637762 }}
                    title={'Parkeringsplats'}
                >
                    <Image
                        source={parkingImage}
                        style={styles.importantMarkerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.298341, latitude: 57.641226 }}
                    title={'Kyrktrappan'}
                >
                    <Image
                        source={stairCaseImage}
                        style={styles.markerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.292950, latitude: 57.639786 }}
                    title={'Dubbens gränd (Trappa)'}
                >
                    <Image
                        source={stairCaseImage}
                        style={styles.markerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.292564, latitude: 57.637437 }}
                    title={'Trappgränd (Trappa)'}
                >
                    <Image
                        source={stairCaseImage}
                        style={styles.markerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.291309, latitude: 57.641052 }}
                    title={'Trappa'}
                >
                    <Image
                        source={stairCaseImage}
                        style={styles.markerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.290150, latitude: 57.636165 }}
                    title={'Stenklivet (Trappa)'}
                >
                    <Image
                        source={stairCaseImage}
                        style={styles.markerImages}
                    />
                </MapView.Marker>

                <MapView.Marker
                    coordinate={{ longitude: 18.297649, latitude: 57.642097 }}
                    title={'Trappa'}
                >
                    <Image
                        source={stairCaseImage}
                        style={styles.markerImages}
                    />
                </MapView.Marker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    markerImages: {
        height: 25,
        width: 25
    },
    importantMarkerImages: {
        height: 28,
        width: 28
    }
})