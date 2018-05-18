

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, ActivityIndicator, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Container, Content, Body, Card } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import LoadingView from 'react-native-loading-view';
import SearchBar from '../SearchBar';
import MapTiles from '../MapTiles';
import NewHeader from '../MapHeader';
import FAB from '../FAB';
import FABExample from '../pages/FABExample';
import Footer from '../Footer';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import geolib from 'geolib';
import { easyRoute } from '../NodesEasy';
import { difficultRoute } from '../NodesDifficult';

import Spinner from 'react-native-loading-spinner-overlay';
var bild = require('../Assets/fadedmap.jpg');


var customToilet = require('../101.jpg');
var customParking = require('../Parking.png');
var customArena = require('../Arena.png');
var customBed = require('../Bed.png');
let { width, height } = Dimensions.get('window');
const tiles = require('../RoadColors');
const mapStyling = require('../mapStyle.json')
const routeArray = [];
const customWaypointArray = [];
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const searchDetails = {};
const nodeCoordinates = require('../NodeCoordinates');
const nodeArray = require('../NodeArray');



export default class Map extends Component {

  constructor() {
    super();
    this.mapRef = null;
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      mapStyle: {},
      originDetails: {},
      destinationDetails: {},
      runOrigin: {},
      routeTile: [],
      originDefined: false,
      destinationDefined: false,
      easyRoads: null,
      runningRoad: null
    }
  }


  renderOriginMarker() {
    if (this.state.originDefined) {
      return (
        <MapView.Marker
          zIndex={1}
          style={{ height: 1 }}
          coordinate={this.state.originDetails}
          pinColor={'red'}
        />
      );
    }
  }

  renderDestinationMarker() {
    if (this.state.destinationDefined) {
      return (
        <MapView.Marker
          zIndex={2}
          style={{ height: 1 }}
          coordinate={this.state.destinationDetails}
          pinColor={'green'}
        />
      );
    }
  }

  renderRoute() {
    if (this.state.originDefined && this.state.destinationDefined) {
      customWaypointArray = [];
      if (this.state.easyRoads || this.state.easyRoads === false) {
        const waypointDetails = this.renderDijkstra(this.state.originDetails, this.state.destinationDetails);
        for (i = 0; i < waypointDetails.length; i++) {
          customWaypointArray.push(waypointDetails[i].coords)
        }
        console.log("här är waypoints", customWaypointArray)
      }
      this.mapRef.fitToCoordinates(
        coordinates = [this.state.originDetails, this.state.destinationDetails],
        {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100, },
          animated: true
          }
      );
      if (customWaypointArray.length <= 23) {
        return (
          <MapViewDirections
            origin={this.state.originDetails}
            destination={this.state.destinationDetails}
            waypoints={customWaypointArray}
            apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
            strokeWidth={5}
            strokeColor='#772119'
            mode='walking'
          />
        );
      } else {
        return (
          <MapViewDirections
            origin={this.state.originDetails}
            destination={customWaypointArray[23]}
            waypoints={customWaypointArray.slice(0, 22)}
            apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
            strokeWidth={5}
            strokeColor='yellow'
            mode='walking'
          />
        );
      }
    }
  }

  renderLongRoute() {
    if (customWaypointArray.length > 23) {
      const longRouteWaypoints = customWaypointArray.slice(24, 45);
      return (
        <MapViewDirections
          origin={customWaypointArray[23]}
          destination={this.state.destinationDetails}
          waypoints={longRouteWaypoints}
          apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
          strokeWidth={5}
          strokeColor='yellow'
          mode='walking'
        />
      );
    }
  }
    renderRoute2() {
      if (this.state.originDefined && this.state.destinationDefined) {
        const customWaypointArray = [];
        if (this.state.easyRoads || this.state.easyRoads === false) {
          console.log('Nu är blå eller grön vald')
          const waypointDetails = this.renderDijkstra(this.state.originDetails, this.state.destinationDetails);
          for (i = 0; i < waypointDetails.length; i++) {
            customWaypointArray.push(waypointDetails[i].coords)
          }
          console.log("här är waypoints", customWaypointArray)
        }
        this.mapRef.fitToCoordinates(
          coordinates = [this.state.originDetails, this.state.destinationDetails], 
          {
            edgePadding: {top: 100, right: 100, bottom: 100, left: 100, },
            animated: true
            }
    
          );
          return ( 
          
            <MapViewDirections
              origin={this.state.originDetails}
              destination={this.state.destinationDetails}
              waypoints={customWaypointArray}
              apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
              strokeWidth={1}
              strokeColor='yellow'
              mode='walking'
            />
          
          );
        }
      }

      runningRoute() {
        const runWaypoints = [];
          if (this.state.easyRoads || this.state.easyRoads === false) {
            console.log('Nu är blå eller grön vald')
            const runWaypoints = [];
           


          this.mapRef.fitToCoordinates(
            coordinates = [this.state.originDetails, this.state.destinationDetails], 
            {
              edgePadding: {top: 100, right: 100, bottom: 100, left: 100, },
              animated: true
              }
      
            );
            return ( 
            
              <MapViewDirections
                origin={{latitude: 57.640342, longitude: 18.287162}}
                destination={{latitude: 57.640342, longitude: 18.287162}}
                waypoints={runWaypoints}
                apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
                strokeWidth={15}
                strokeColor='orange'
                mode='walking'
              />
            
            );
          }
        }
  

  findNearestNode(definedCoord) {
    console.log('definierade koordinater', definedCoord)
    // const neighbor = require('nearest-neighbor');
    // const latitude = JSON.stringify(definedCoord.latitude);
    // const longitude = JSON.stringify(definedCoord.longitude);
    // const newCoord = latitude + ", " + longitude;
    // const query = { coordinates: newCoord };
    // const fields = [
    //   { name: "coordinates", measure: neighbor.comparisonMethods.word }
    // ];
    // neighbor.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
    //   console.log('Nearest neighbor is:', nearestNeighbor);
    //   sendID = nearestNeighbor.id
    // });
    // return (
    //   sendID
    // )

    // const spots = {
    //   "A ": { latitude: 57.641692, longitude: 18.293447},
    //   "B": { latitude: 57.639975, longitude: 18.295738 }
    // };
    // const nearest = geolib.findNearest({latitude: 57.642247, longitude: 18.293311}, spots, 1);
    // console.log('Här är närmast', nearest);

    // const spots = {
    //   "Brandenburg Gate, Berlin": { latitude: 52.516272, longitude: 13.377722 },
    //   "Dortmund U-Tower": { latitude: 51.515, longitude: 7.453619 },
    //   "London Eye": { latitude: 51.503333, longitude: -0.119722 },
    //   "Kremlin, Moscow": { latitude: 55.751667, longitude: 37.617778 },
    //   "Eiffel Tower, Paris": { latitude: 48.8583, longitude: 2.2945 },
    //   "Riksdag building, Stockholm": { latitude: 59.3275, longitude: 18.0675 },
    //   "Royal Palace, Oslo": { latitude: 59.916911, longitude: 10.727567 },
    //   "Någonstans i visby": { latitude: 57.639962, longitude: 18.293599 },
    //   "Någonstans nära Scandic": { latitude: 57.632240, longitude: 18.281416 }
    // }

    console.log("här är noderna", nodeCoordinates)
    nodeCoordinates.InputLocation = definedCoord;
    console.log("här är ett nytt objekt", nodeCoordinates)

    const nearestNode = geolib.findNearest(nodeCoordinates["InputLocation"], nodeCoordinates, 1);
    console.log('Närmast', nearestNode.key)
    return (
      nearestNode.key
    )
  }


  renderDijkstra(originCoords, destinationCoords) {
    const originNode = this.findNearestNode(originCoords);
    const destinationNode = this.findNearestNode(destinationCoords);
    console.log('Här är originID', originNode);
    console.log('Här är destinationID', destinationNode);
    console.log('Här är state.easyRoads = ', this.state.easyRoads)
    const arrayToSend = [];
    if (this.state.easyRoads) {
      routeArray = easyRoute.path(originNode, destinationNode, { trim: true });
    }
    else if (this.state.easyRoads === false) {
      routeArray = difficultRoute.path(originNode, destinationNode, { trim: true });
    }
    console.log("här är routearray", routeArray)
    // for (i = 0; i < nodeArray.length; i++) {
    //   if (routeArray.includes(nodeArray[i].id)) {
    //     arrayToSend.push(nodeArray[i])
    //   }
    // }
    for (i = 0; i < routeArray.length; i++) {
      for (j = 0; j < nodeArray.length; j++) {
        if (routeArray[i] === nodeArray[j].id) {
          arrayToSend.push(nodeArray[j])
        }
      }
    }
    console.log('hej, här är ny array', arrayToSend)
    return (
      arrayToSend
    )
  }

  updateStyle() {
    this.setState({
      mapStyle: {
        height: '100%',
        width: '100%'

      }
    })
  }

  componentWillMount() {
    setTimeout(() => this.updateStyle(), 1000);
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    // axios.get('https://api.myjson.com/bins/1gjnje')
    //   .then(response => this.setState({ tiles: response.data, visible: false }))
    //   .catch((error) => {
    //     alert(error.message)
    //   });
  };

  // componentDidMount = () => {
  //   // This is just ment as an example of how you handle an asynchronus operation 
  //   // In reality this might be a fetch or storage access 
  //   setTimeout(() => {
  //     this.setState({
  //       loading: false
  //     })
  //   }, 8000)
  // }

  // componentDidMount() {
  //     this.getDirections("18.299425, 57.636907", "18.301871, 57.635942")
  // }

  // async getDirections(startLoc, destLoc) {
  //     console.log(this.state.coords);
  //     try {
  //         let resp = await fetch('https://maps.googleapis.com/maps/api/directions/json?origin=${ 18.299425, 57.636907 }&destination=${ 18.301871, 57.635942 }')
  //         let respJson = await resp.json();
  //         let points = PolyLine.decode(respJson.routes[0].overview_polyline.points);
  //         let coords = points.map((point, index) => {
  //             return {
  //                 latitude: point[0],
  //                 longitude: point[1]
  //             }
  //         })
  //         this.setState({coords: coords})
  //         return coords
  //     } catch(error) {
  //         return error
  //     }
  // }

  routeAlternativeCallback = (chosenIndex) => {
    // if (chosenIndex === 1 || chosenIndex === 2) {
    //   this.setState({ easyAlternative: true, hardAlternative: false })
    // } 
    // else if (chosenIndex === 3) {
    //   this.setState({ easyAlternative: false, hardAlternative: true })
    // } else {
    //   this.setState({ easyAlternative: false, hardAlternative: false })
    // }
    if (chosenIndex === 1 || chosenIndex === 2) {
      this.setState({ easyRoads: true })
    }
    else if (chosenIndex === 3) {
      this.setState({ easyRoads: false })
    }
    else {
      this.setState({ easyRoads: null })
    }
  }

  runningRouteCallback = (colorRun) =>
  {
    if (colorRun === 1 || colorRun === 2) {
      this.setState({ runningRoad: true })
    }
    else if (colorRun === 3) {
      this.setState({ runningRoad: false })
    }
    else {
      this.setState({ runningRoad: null })
    }
  }

  originCallback = (detailsFromSearch) => {
    this.setState({ originDetails: detailsFromSearch, originDefined: true })
    console.log('originDetails: ', this.state.originDetails);
  }

  destinationCallback = (detailsFromSearch) => {
    this.setState({ destinationDetails: detailsFromSearch, destinationDefined: true })
    console.log('destinationDetails: ', this.state.destinationDetails);
  }



  renderTiles() {
    console.log(this.state.originDetails)
    return tiles.map(tile =>
      <MapTiles key={tile.origin} tile={tile} />
    );
    //   setTimeout(() => {
    //         this.setState({
    //           loading: false
    //         })
    //       }, 8000)
  }


  render() {
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;
    const onMap = true;
    return (
      <Container>
        <View style={{ height: 150 }}>
          <NewHeader />
        </View>


        {/* <LoadingView loading={this.state.loading}> */}
        <Content>



          {/* <View>
          <SearchBar callbackFromParent={this.originCallback} placeholder={'Från'} />
          <SearchBar callbackFromParent={this.destinationCallback} placeholder={'Till'} />
          </View> */}
          <View style={{ width, height }}>

            {/* <Spinner
              visible={this.state.visible}
              animation='fade'
              style={styles.activityIndicator}
            >
              <View style={styles.spinnerView}>
                <View style={styles.spinnerModal}>
                  <ActivityIndicator size='large' color='black' />
                  <Text style={styles.spinnerText}>Laddar pister</Text>
                </View>
              </View>
            </Spinner> */}


            <MapView
              ref={(ref) => { this.mapRef = ref }}
              provider={PROVIDER_GOOGLE}
              style={styles.container}
              customMapStyle={mapStyling}
              initialRegion={{
                latitude: 57.637685,
                longitude: 18.292500,
                latitudeDelta: 0.002,
                longitudeDelta: 0.015
              }}
            >
              <MapView.Marker
                style={{ height: 1}}
                coordinate={{ longitude: 18.288779, latitude: 57.640684 }}
                title={'Tillgänglighetsarenan'}
                image={customArena}
              // pinColor={'blue'}
              />
              <MapView.Marker
                style={{ height: 1 }}
                coordinate={{ longitude: 18.2800916, latitude: 57.6317496 }}
                title={'Scandic Visby'}
                pinColor={'blue'}
                image={customBed}
              />
              <MapView.Marker
                style={{ height: 1 }}
                coordinate={{ longitude: 18.2892483, latitude: 57.6402041 }}
                title={'Tillgängliga toaletter'}
                pinColor={'blue'}
                image={customToilet}
              />
              <MapView.Marker
                style={{ height: 1 }}
                coordinate={{ longitude: 18.288044, latitude: 57.6376372 }}
                title={'Parkeringsplats'}
                pinColor={'blue'}
                image={customParking}
              />
              {this.renderOriginMarker()};
              {this.renderDestinationMarker()};
              {this.renderRoute2()};
              {this.renderRoute()};
              {this.renderLongRoute()};
              {this.renderTiles()};
            </MapView>
            <FABExample callbackFromParent={this.routeAlternativeCallback} />
            <View style={{ position: 'absolute', flexDirection: 'column', width: width }}>

              <View style={{ flex: 1 }} zIndex={3}>
                <SearchBar callbackFromParent={this.destinationCallback} placeholder={'Till'} />
              </View>
              <View style={{ position: 'absolute', flexDirection: 'column', width: width, flex: 1, marginTop: 35 }}>
                <SearchBar callbackFromParent={this.originCallback} placeholder={'Från'} />
              </View>
              {/* <Image source={require('../Assets/windrose2.png')} style={{width:80, height:80, marginTop: 100, marginLeft: 20}} />
          */}
            </View>
          </View>

        </Content>
        {/* </LoadingView> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  activityIndicator: {
    flex: 1,
  },
  spinnerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerModal: {
    width: 200,
    height: 130,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerText: {
    fontSize: 20,
    marginTop: 10,
    textShadowColor: 'black',
    fontFamily: 'Arial-BoldItalicMT'
  }
});




    // AppRegistry.registerComponent('MapExample', () => MapExample);
//{this.renderTiles()}

// import React, { Component } from 'react';
// import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// let { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 0;
// const LONGITUDE = 0;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
/*

const coordinates = [
  {
    latitude: 18.2954925,
    longitude: 57.6408186
  },
  {
    latitude: 18.2946771,
    longitude: 57.6409392
  }
];

<MapViewDirections
              //origin={{ longitude: 18.2925582, latitude: 57.6354749 }}
              //destination={{ longitude: 18.2982713, latitude: 57.6384871 }}
              origin={coordinates[0]}
              destination={coordinates[1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
            />
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

*/







// import React, { Component } from 'react';
// import { Dimensions, StyleSheet } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.771707;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const GOOGLE_MAPS_APIKEY = 'AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ';

// class Map extends Component {

//   constructor(props) {
//     super(props);

//     // AirBnB's Office, and Apple Park
//     this.state = {
//       coordinates: [
//         {
//           latitude: 37.3317876,
//           longitude: -122.0054812,
//         },
//         {
//           latitude: 37.771707,
//           longitude: -122.4053769,
//         },
//       ],
//     };

//     this.mapView = null;
//   }

//   onMapPress = (e) => {
//     this.setState({
//       coordinates: [
//         ...this.state.coordinates,
//         e.nativeEvent.coordinate,
//       ],
//     });
//   }

//   render() {
//     return (
//       <MapView
//       provider={ PROVIDER_GOOGLE }
//         initialRegion={{
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }}
//         style={StyleSheet.absoluteFill}
//         ref={c => this.mapView = c}
//         onPress={this.onMapPress}
//       >
//         {this.state.coordinates.map((coordinate, index) =>
//           <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
//         )}
//         {(this.state.coordinates.length >= 2) && (
//           <MapViewDirections
//             origin={this.state.coordinates[0]}
//             waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
//             destination={this.state.coordinates[this.state.coordinates.length-1]}
//             apikey={GOOGLE_MAPS_APIKEY}
//             mode={'walking'}
//             strokeWidth={3}
//             strokeColor="hotpink"
//             onStart={(params) => {
//               console.log(Started routing between "${params.origin}" and "${params.destination}");
//             }}
//             onReady={(result) => {
//                 console.log(result)
//               this.mapView.fitToCoordinates(result.coordinates, {
//                 edgePadding: {
//                   right: (width / 20),
//                   bottom: (height / 20),
//                   left: (width / 20),
//                   top: (height / 20),
//                 }
//               });
//             }}
//             onError={(errorMessage) => {
//               // console.log('GOT AN ERROR');
//             }}
//           />
//         )}
//       </MapView>
//     );
//   }
// }

// export default Map;

// import React, { Component } from 'react';
// import { StyleSheet, View, Dimensions, Text } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import { Container, Content, Body } from 'native-base';
// import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';
// import LoadingView from 'react-native-loading-view';
// import SearchBar from '../SearchBar';
// import MapTiles from '../MapTiles';
// import NewHeader from '../MapHeader';
// import FAB from '../FAB';
// import Footer from '../Footer';


// var customToilet = require('../101.jpg');
// var customParking = require('../Parking.png');
// var customArena = require('../Arena.png');
// var customBed = require('../Bed.png');
// let { width, height } = Dimensions.get('window');

// const ASPECT_RATIO = width / height;
// const LATITUDE = 0;
// const LONGITUDE = 0;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const searchDetails = {};

// export default class Map extends Component {

//   constructor() {
//     super();
//     this.state = {
//       region: {
//         latitude: LATITUDE,
//         longitude: LONGITUDE,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA
//       },
//       tiles: [],
//       mapStyle: {},
//       originDetails: {},
//       destinationDetails: {},
//       routeTile: [],
//       // loading: true
//       originDefined: false,
//       destinationDefined: false
//     }
//   }


//   renderOriginMarker() {
//     if (this.state.originDefined) {
//       console.log('hej');
//       return (
//         <MapView.Marker
//           style={{ height: 1 }}
//           coordinate={this.state.originDetails}
//           pinColor={'red'}
//         />
//       );
//     }
//   }

//   renderDestinationMarker() {
//     if (this.state.destinationDefined) {
//       return (
//         <MapView.Marker
//           style={{ height: 1 }}
//           coordinate={this.state.destinationDetails}
//           pinColor={'green'}
//         />
//       );
//     }
//   }

//   renderRoute() {
//     console.log('legend');
//     if (this.state.originDefined && this.state.destinationDefined) {
//       return (
//         <MapViewDirections
//           origin={this.state.originDetails}
//           destination={this.state.destinationDetails}
//           apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
//           strokeWidth={5}
//           strokeColor='yellow'
//           mode='walking'
//         />
//       );
//     }
//   }

//   updateStyle() {
//     this.setState({
//       mapStyle: {
//         height: '100%',
//         width: '100%'
//       }
//     })
//   }

//   componentWillMount() {
//     setTimeout(() => this.updateStyle(), 1000);
//     Geolocation.getCurrentPosition(
//       position => {
//         this.setState({
//           region: {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA
//           }
//         });
//       },
//       (error) => console.log(error.message),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//     );
//     axios.get('https://api.myjson.com/bins/iugzr')
//       .then(response => this.setState({ tiles: response.data }))
//       .catch((error) => {
//         alert(error.message)
//       });
//   };

//   // componentDidMount = () => {
//   //   // This is just ment as an example of how you handle an asynchronus operation 
//   //   // In reality this might be a fetch or storage access 
//   //   setTimeout(() => {
//   //     this.setState({
//   //       loading: false
//   //     })
//   //   }, 8000)
//   // }

//   // componentDidMount() {
//   //     this.getDirections("18.299425, 57.636907", "18.301871, 57.635942")
//   // }

//   // async getDirections(startLoc, destLoc) {
//   //     console.log(this.state.coords);
//   //     try {
//   //         let resp = await fetch('https://maps.googleapis.com/maps/api/directions/json?origin=${ 18.299425, 57.636907 }&destination=${ 18.301871, 57.635942 }')
//   //         let respJson = await resp.json();
//   //         let points = PolyLine.decode(respJson.routes[0].overview_polyline.points);
//   //         let coords = points.map((point, index) => {
//   //             return {
//   //                 latitude: point[0],
//   //                 longitude: point[1]
//   //             }
//   //         })
//   //         this.setState({coords: coords})
//   //         return coords
//   //     } catch(error) {
//   //         return error
//   //     }
//   // }

//   originCallback = (detailsFromSearch) => {
//     this.setState({ originDetails: detailsFromSearch, originDefined: true })
//     console.log('originDetails: ', this.state.originDetails);
//   };

//   destinationCallback = (detailsFromSearch) => {
//     this.setState({ destinationDetails: detailsFromSearch, destinationDefined: true })
//     console.log('destinationDetails: ', this.state.destinationDetails);
//   }



//   renderTiles() {
//     console.log(this.state.originDetails)
//     return this.state.tiles.map(tile =>
//       <MapTiles key={tile.origin} tile={tile} />
//     );
//     //   setTimeout(() => {
//     //         this.setState({
//     //           loading: false
//     //         })
//     //       }, 8000)
//   }


//   render() {
//     const { width, height } = Dimensions.get('window');
//     const ratio = width / height;
//     const onMap = true;
//     return (
//       <Container>
//         <NewHeader />
//         {/* <LoadingView loading={this.state.loading}> */}
//         <Content>
//           <SearchBar callbackFromParent={this.originCallback} placeholder={'Från'} />
//           <SearchBar callbackFromParent={this.destinationCallback} placeholder={'Till'} />
//           <View style={{ width, height }}>

//             <MapView
//               provider={PROVIDER_GOOGLE}
//               style={styles.container}
//               initialRegion={{
//                 latitude: 57.637545, 
//                 longitude: 18.293706,
//                 latitudeDelta: 0.00012,
//                 longitudeDelta: 0.020
//               }}
//             >
//               <MapView.Marker
//                 style={{ height: 1}}
//                 coordinate={{ longitude: 18.292853, latitude: 57.641380 }}
//                 title={'Tillgänglighetsarenan'}
//                 image={customArena}
//                 // pinColor={'blue'}
//               />
//               <MapView.Marker
//                 style={{ height: 1 }}
//                 coordinate={{ longitude: 18.2800916, latitude: 57.6317496 }}
//                 title={'Scandic Visby'}
//                 pinColor={'blue'}
//                 image={customBed}
//               />
//               <MapView.Marker
//                 style={{ height: 1 }}
//                 coordinate={{ longitude: 18.2892483, latitude: 57.6402041 }}
//                 title={'Tillgängliga toaletter'}
//                 pinColor={'blue'}
//                 image={customToilet}
//               />
//               <MapView.Marker
//                 style={{ height: 1 }}
//                 coordinate={{ longitude: 18.288044, latitude: 57.6376372 }}
//                 title={'Parkeringsplats'}
//                 pinColor={'blue'}
//                 image={customParking}
//               />
//               {this.renderOriginMarker()};
//               {this.renderDestinationMarker()};
//               {this.renderRoute()};
//               {this.renderTiles()};
//             </MapView>
//             <FAB />
//           </View>
//         </Content>
//         {/* </LoadingView> */}
//       </Container>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%'
//   }
// });




//     // AppRegistry.registerComponent('MapExample', () => MapExample);
// //{this.renderTiles()}

// // import React, { Component } from 'react';
// // import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
// // import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// // let { width, height } = Dimensions.get('window');

// // const ASPECT_RATIO = width / height;
// // const LATITUDE = 0;
// // const LONGITUDE = 0;
// // const LATITUDE_DELTA = 0.0922;
// // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// /*

// const coordinates = [
//   {
//     latitude: 18.2954925,
//     longitude: 57.6408186
//   },
//   {
//     latitude: 18.2946771,
//     longitude: 57.6409392
//   }
// ];

// <MapViewDirections
//               //origin={{ longitude: 18.2925582, latitude: 57.6354749 }}
//               //destination={{ longitude: 18.2982713, latitude: 57.6384871 }}
//               origin={coordinates[0]}
//               destination={coordinates[1]}
//               apikey={GOOGLE_MAPS_APIKEY}
//               strokeWidth={3}
//               strokeColor="blue"
//             />
// // class Map extends Component {

// //     constructor() {
// //       super();

// //       this.state = {
// //         region: {
// //           latitude: LATITUDE,
// //           longitude: LONGITUDE,
// //           latitudeDelta: LATITUDE_DELTA,
// //           longitudeDelta: LONGITUDE_DELTA,
// //         }
// //       };
// //     }

// //     componentDidMount() {
// //         navigator.geolocation.getCurrentPosition(
// //           position => {
// //             this.setState({
// //               region: {
// //                 latitude: position.coords.latitude,
// //                 longitude: position.coords.longitude,
// //                 latitudeDelta: LATITUDE_DELTA,
// //                 longitudeDelta: LONGITUDE_DELTA,
// //               }
// //             });
// //           },
// //         (error) => console.log(error.message),
// //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
// //         );
// //         this.watchID = navigator.geolocation.watchPosition(
// //           position => {
// //             this.setState({
// //               region: {
// //                 latitude: position.coords.latitude,
// //                 longitude: position.coords.longitude,
// //                 latitudeDelta: LATITUDE_DELTA,
// //                 longitudeDelta: LONGITUDE_DELTA,
// //               }
// //             });
// //           }

// //         );
// //     }

// //     componentWillUnmount() {
// //       navigator.geolocation.clearWatch(this.watchID);
// //     }

// //     render() {
// //       return (
// //         <MapView
// //           provider={ PROVIDER_GOOGLE }
// //           style={ styles.container }
// //           showsUserLocation={ true }
// //           region={ this.state.region }
// //           onRegionChange={ region => this.setState({region}) }
// //           onRegionChangeComplete={ region => this.setState({region}) }
// //         >
// //           <MapView.Marker
// //             coordinate={ this.state.region }

// //           />
//         //   <MapView.Marker
//         //     coordinate={{ longitude: 18.292853, latitude: 57.641380 }}
//         //     title={'Tillgänglighetsarenan'}
//         //     pinColor={'blue'}
//         //   />
//         // </MapView>
// //       );
// //     }
// //   }

// //   const styles = StyleSheet.create({
// //     container: {
// //       height: '100%',
// //       width: '100%',
// //     }
// //   });

// */







// // import React, { Component } from 'react';
// // import { Dimensions, StyleSheet } from 'react-native';
// // import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// // import MapViewDirections from 'react-native-maps-directions';

// // const { width, height } = Dimensions.get('window');
// // const ASPECT_RATIO = width / height;
// // const LATITUDE = 37.771707;
// // const LONGITUDE = -122.4053769;
// // const LATITUDE_DELTA = 0.0922;
// // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// // const GOOGLE_MAPS_APIKEY = 'AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ';

// // class Map extends Component {

// //   constructor(props) {
// //     super(props);

// //     // AirBnB's Office, and Apple Park
// //     this.state = {
// //       coordinates: [
// //         {
// //           latitude: 37.3317876,
// //           longitude: -122.0054812,
// //         },
// //         {
// //           latitude: 37.771707,
// //           longitude: -122.4053769,
// //         },
// //       ],
// //     };

// //     this.mapView = null;
// //   }

// //   onMapPress = (e) => {
// //     this.setState({
// //       coordinates: [
// //         ...this.state.coordinates,
// //         e.nativeEvent.coordinate,
// //       ],
// //     });
// //   }

// //   render() {
// //     return (
// //       <MapView
// //       provider={ PROVIDER_GOOGLE }
// //         initialRegion={{
// //           latitude: LATITUDE,
// //           longitude: LONGITUDE,
// //           latitudeDelta: LATITUDE_DELTA,
// //           longitudeDelta: LONGITUDE_DELTA,
// //         }}
// //         style={StyleSheet.absoluteFill}
// //         ref={c => this.mapView = c}
// //         onPress={this.onMapPress}
// //       >
// //         {this.state.coordinates.map((coordinate, index) =>
// //           <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
// //         )}
// //         {(this.state.coordinates.length >= 2) && (
// //           <MapViewDirections
// //             origin={this.state.coordinates[0]}
// //             waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
// //             destination={this.state.coordinates[this.state.coordinates.length-1]}
// //             apikey={GOOGLE_MAPS_APIKEY}
// //             mode={'walking'}
// //             strokeWidth={3}
// //             strokeColor="hotpink"
// //             onStart={(params) => {
// //               console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
// //             }}
// //             onReady={(result) => {
// //                 console.log(result)
// //               this.mapView.fitToCoordinates(result.coordinates, {
// //                 edgePadding: {
// //                   right: (width / 20),
// //                   bottom: (height / 20),
// //                   left: (width / 20),
// //                   top: (height / 20),
// //                 }
// //               });
// //             }}
// //             onError={(errorMessage) => {
// //               // console.log('GOT AN ERROR');
// //             }}
// //           />
// //         )}
// //       </MapView>
// //     );
// //   }
// // }

// // export default Map;





