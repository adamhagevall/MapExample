import React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MapTiles = ({ tile }) => {
    const { origin, destination, waypoints, strokeWidth, strokeColor } = tile;

    return (
        <MapViewDirections
            zIndex={1}
            origin={origin}
            destination={destination}
            waypoints={waypoints}
            apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
            strokeWidth={4}
            strokeColor={strokeColor}
            mode='walking'
        />   
    );
};

export default MapTiles;