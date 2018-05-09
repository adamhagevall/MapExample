import React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MapTiles = ({ tile }) => {
    const { origin, destination, waypoints, strokeWidth, strokeColor } = tile;

    return (
        <MapViewDirections
            origin={origin}
            destination={destination}
            waypoints={waypoints}
            apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
            strokeWidth={4}
            strokeColor={strokeColor}
            mode='walking'
        />   
    );
};

export default MapTiles;