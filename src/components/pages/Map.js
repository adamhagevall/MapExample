
import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, ActivityIndicator, Image, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Container, Content, Body, Card, Toast, Fab, Icon } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import LoadingView from 'react-native-loading-view';
import SearchBar from '../SearchBar';
import MapTiles from '../MapTiles';
import NewHeader from '../MapHeader';
import FABExample from '../pages/FABExample';
import FAB from '../FAB';
import Markers from '../Markers';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import geolib from 'geolib';
import { greenRoute } from '../NodesGreen';
import { blueRoute } from '../NodesBlue';
import { redRoute } from '../NodesRed';

var bild = require('../Assets/fadedmap.jpg');

//  spring action sheet 

import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'


const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 4
const options = [
  'Cancel',
  {
    component: <Text style={{ color: 'green', fontSize: 15 }}>GRÖN</Text>,
    height: 45,
  },
  {
    component: <Text style={{ color: 'blue', fontSize: 15 }}>BLÅ </Text>,
    height: 45,
  },
  {
    component: <Text style={{ color: 'red', fontSize: 15 }}>RÖD </Text>,
    height: 45,
  },
  {
    component: <Text style={{ color: 'black', fontSize: 15 }}>SVART </Text>,
    height: 45,
  }

]
const title = <Text style={{ color: 'crimson', fontSize: 18 }}>Välj en motionsrunda</Text>


//Spring actionsheet slut

let { width, height } = Dimensions.get('window');
const tiles = require('../RoadColors');
const mapStyling = require('../mapStyle.json')
const dijkstraArray = [];
const pathArray = [];
const customWaypointArray = [];
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const searchDetails = {};
const nodeCoordinates = require('../NodeCoordinates');
const nodeArray = require('../NodeArray');

const runWaypoints = [
  "57.640153, 18.289647",
  "57.639046, 18.291496",
  "57.637673, 18.288530",
  "57.636289, 18.287347",
  "57.635392, 18.289594",
  "57.636854, 18.289970",
  "57.637782, 18.290814",
  "57.639045, 18.291494",
  "57.638785, 18.292454",
  "57.639823, 18.299277",
  "57.640846, 18.299939",
  "57.642395, 18.297068",
  "57.642624, 18.292865",
  "57.642570, 18.291898",
  "57.642019, 18.291946",
  "57.642357, 18.294199",
  "57.641593, 18.296036",
  "57.640902, 18.295103"
]
const coordinatesToChange = [
  { latitude: 57.6394025, longitude: 18.2978174 },
  { latitude: 57.6388676, longitude: 18.2884245 },
  { latitude: 57.64066580000001, longitude: 18.288802 },
  { latitude: 57.6368509, longitude: 18.2940697 },
  { latitude: 57.6394697, longitude: 18.2941732 },
  { latitude: 57.637457, longitude: 18.2880791 },
  { latitude: 57.637457, longitude: 18.2880791 },
  { latitude: 57.640335, longitude: 18.2978775 },
  { latitude: 57.6390044, longitude: 18.2953983 }
]
const newCoordinates = [
  { latitude: 57.639463, longitude: 18.297678 },
  { latitude: 57.639001, longitude: 18.288192 },
  { latitude: 57.640982, longitude: 18.289178 },
  { latitude: 57.636779, longitude: 18.293984 },
  { latitude: 57.639418, longitude: 18.294114 },
  { latitude: 57.637438, longitude: 18.288060 },
  { latitude: 57.637438, longitude: 18.288060 },
  { latitude: 57.640295, longitude: 18.297808 },
  { latitude: 57.639070, longitude: 18.295489 }
]

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
      roadIndex: 4,
      runningRoad: null,
      showToast: false,
      active: 'true',
      selected2: 0,
      searchAlternatives: false
    }
  }

  renderOriginMarker() {
    if (this.state.originDefined) {
      const pinColor = null;
      if (this.state.roadIndex === 1) {
        pinColor = '#5aa73f';
      } else if (this.state.roadIndex === 2) {
        pinColor = '#008ccf';
      } else if (this.state.roadIndex === 3) {
        pinColor = '#ff2232';
      } else {
        pinColor = 'black';
      }
      return (
        <MapView.Marker
          zIndex={1}
          style={{ height: 1 }}
          coordinate={this.state.originDetails}
          pinColor={pinColor}
        />
      );
    }
  }

  renderDestinationMarker() {
    if (this.state.destinationDefined) {
      const pinColor = null;
      if (this.state.roadIndex === 1) {
        pinColor = '#5aa73f';
      } else if (this.state.roadIndex === 2) {
        pinColor = '#008ccf';
      } else if (this.state.roadIndex === 3) {
        pinColor = '#ff2232';
      } else {
        pinColor = 'black';
      }
      return (
        <MapView.Marker
          zIndex={2}
          style={{ height: 1 }}
          coordinate={this.state.destinationDetails}
          pinColor={pinColor}
        />
      );
    }
  }

  renderRoute() {
    if (this.state.originDefined && this.state.destinationDefined) {
      customWaypointArray = [];
      if (this.state.originDetails.latitude !== this.state.destinationDetails.latitude && this.state.originDetails.longitude !== this.state.destinationDetails.longitude) {
        if (this.state.roadIndex != 4) {
          const waypointDetails = this.renderDijkstra(this.state.originDetails, this.state.destinationDetails);
          for (i = 0; i < waypointDetails.length; i++) {
            customWaypointArray.push(waypointDetails[i].coords)
          }
          console.log("här är waypoints", customWaypointArray)
        }
        // this.mapRef.fitToCoordinates(
        //   coordinates = [this.state.originDetails, this.state.destinationDetails],
        //   {
        //     edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        //     animated: true
        //   }
        // );
        if (customWaypointArray.length <= 23) {
          return (
            <MapViewDirections
              origin={this.state.originDetails}
              destination={this.state.destinationDetails}
              waypoints={customWaypointArray}
              apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
              strokeWidth={15}
              strokeColor='#fcff77'
              mode='walking'
            />
          );
        } else {
          return (
            <MapViewDirections
              origin={this.state.originDetails}
              destination={customWaypointArray[23]}
              waypoints={customWaypointArray.slice(0, 22)}
              apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
              strokeWidth={15}
              strokeColor='#fcff77'
              mode='walking'
            />
          );
        }
      } else {
        this.renderError();
      }
    }
  }

  renderError() {
    Toast.show({
      text: 'Det gick inte att skapa någon vägbeskrivning. Vänligen kontrollera dina val.',
      style: { backgroundColor: 'grey', marginBottom: 20 },
      buttonText: 'Jag förstår',
      buttonTextStyle: { color: 'black' },
      buttonStyle: { backgroundColor: 'white', marginTop: 30, },
      duration: 10000
    })
  }

  renderLongRoute() {
    if (customWaypointArray.length > 23) {
      const longRouteWaypoints = customWaypointArray.slice(24, 45);
      return (
        <MapViewDirections
          origin={customWaypointArray[23]}
          destination={this.state.destinationDetails}
          waypoints={longRouteWaypoints}
          apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
          strokeWidth={15}
          strokeColor='#fcff77'
          mode='walking'
        />
      );
    }
  }

  runningRoute() {
    if (this.state.selected2 === 1) {
      return (
        <MapViewDirections
          origin={{ latitude: 57.639741, longitude: 18.286679 }}
          destination={{ latitude: 57.639354, longitude: 18.293128 }}
          waypoints={runWaypoints}
          apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
          strokeWidth={15}
          strokeColor='orange'
          mode='walking'
        />
      )
    }
    if (this.state.selected2 === 2) {
      return (
        <MapViewDirections
          origin={{ latitude: 57.639741, longitude: 18.286679 }}
          destination={{ latitude: 57.639354, longitude: 18.293128 }}
          waypoints={runWaypoints}
          apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
          strokeWidth={15}
          strokeColor='orange'
          mode='walking'
        />)
    }
    if (this.state.selected2 === 3) {
      return (
        <MapViewDirections
          origin={{ latitude: 57.639741, longitude: 18.286679 }}
          destination={{ latitude: 57.639354, longitude: 18.293128 }}
          waypoints={runWaypoints}
          apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
          strokeWidth={15}
          strokeColor='orange'
          mode='walking'
        />)
    }
    if (this.state.selected2 === 4) {
      return (
        <MapViewDirections
          origin={{ latitude: 57.639741, longitude: 18.286679 }}
          destination={{ latitude: 57.639354, longitude: 18.293128 }}
          waypoints={runWaypoints}
          apikey="AIzaSyAVoFdCevwg5QcC11Kzn3AOKS_UcGFgvMk"
          strokeWidth={15}
          strokeColor='orange'
          mode='walking'
        />)
    }
  }

  runningExitButton() {
    if (this.state.selected2 === 1) {
      return (
        <FAB />
      )
    }
    if (this.state.selected2 === 2) {
      return (
        <Fab
          active={this.state.active}
          active={false}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: 'red', marginBottom: 200, width: 40, height: 40 }}
          position="bottomLeft"
          onPress={() => {
          }}
        >
          <Icon name="close-circle" />
        </Fab>
      )
    }
    if (this.state.selected2 === 3) {
      return (
        <FABExample />
      )
    }
    if (this.state.selected2 === 4) {
      return (
        <FABExample />
      )
    }
  }

  findNearestNode(definedCoord) {
    nodeCoordinates.InputLocation = definedCoord;
    const nearestNode = geolib.findNearest(nodeCoordinates["InputLocation"], nodeCoordinates, 1);
    return (
      nearestNode.key
    )
  }

  renderDijkstra(originCoords, destinationCoords) {
    const originNode = this.findNearestNode(originCoords);
    const destinationNode = this.findNearestNode(destinationCoords);
    const arrayToSend = [];
    if (this.state.roadIndex === 1) {
      dijkstraArray = greenRoute.path(originNode, destinationNode, { trim: true, cost: true });
    }
    else if (this.state.roadIndex === 2) {
      dijkstraArray = blueRoute.path(originNode, destinationNode, { trim: true, cost: true });
    }
    else if (this.state.roadIndex === 3) {
      dijkstraArray = redRoute.path(originNode, destinationNode, { trim: true, cost: true });
    }
    if (dijkstraArray.cost >= 100) {
      this.renderAlert();
    }
    console.log('Kostnad', dijkstraArray.cost)
    pathArray = dijkstraArray.path;
    for (i = 0; i < pathArray.length; i++) {
      for (j = 0; j < nodeArray.length; j++) {
        if (pathArray[i] === nodeArray[j].id) {
          arrayToSend.push(nodeArray[j])
        }
      }
    }
    console.log('hej, här är ny array', arrayToSend)
    return (
      arrayToSend
    )
  }

  renderAlert() {
    Toast.show({
      text: 'Notera att rutten inte går att planera efter dina önskemål',
      style: { backgroundColor: 'grey', marginBottom: 38 },
      buttonText: 'Jag förstår',
      buttonTextStyle: { color: 'black' },
      buttonStyle: { backgroundColor: 'white', marginTop: 5 },
      duration: 10000
    })
  }

  showActionSheet() {
    this.actionSheet.show()
  }

  getActionSheetRef = ref => (this.actionSheet = ref)

  handlePress = index => { this.setState({ selected2: index }) }

  handleRunning() {

    if (this.state.selected2 === 1) {
      this.setState({ runWay: null })
    }
    if (this.state.selected2 === 2) {
      console.log('green')
    }
    if (this.state.selected2 === 3) {
      console.log('green')
    }
    if (this.state.selected2 === 4) {
      console.log('green')
    }
  }

  renderRunningRoute() {

    if (this.state.roadIndex === 5) {
      console.log('onButtonPress')
      { this.showActionSheet() }
      this.setState({ roadIndex: null })

      // Alert.alert(
      //   'Alert Title',
      //   'My Alert Msg',
      //   [
      //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ],
      //   { cancelable: false }
      // )
      // Toast.show({
      //   text: 'Sakta i backarna! Notera att rutten inte går att planera efter dina önskemål',
      //   style: { backgroundColor: 'grey', marginBottom: 20 },
      //   buttonText: 'Jag förstår',
      //   buttonText: 'Jag förstår',
      //   buttonTextStyle: { color: 'white' },
      //   buttonStyle: { backgroundColor: 'red' },
      //   duration: 300000
      // })

    }
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
    Geolocation.clearWatch(this.watchID);
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

  componentDidMount() {
    Geolocation.watchPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  };

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  routeAlternativeCallback = (chosenIndex) => {
    if (chosenIndex != 0) {
      this.setState({ roadIndex: chosenIndex })
      console.log('Nuvarande index (får inte vara 0)', chosenIndex)
    }
  }

  runningRouteCallback = (colorRun) => {
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
    for (i = 0; i < coordinatesToChange.length; i++) {
      if (detailsFromSearch.latitude === coordinatesToChange[i].latitude && detailsFromSearch.longitude === coordinatesToChange[i].longitude) {
        detailsFromSearch.latitude = newCoordinates[i].latitude;
        detailsFromSearch.longitude = newCoordinates[i].longitude;
      }
    }
    this.setState({ originDetails: detailsFromSearch, originDefined: true })
  }

  destinationCallback = (detailsFromSearch) => {
    for (i = 0; i < coordinatesToChange.length; i++) {
      if (detailsFromSearch.latitude === coordinatesToChange[i].latitude && detailsFromSearch.longitude === coordinatesToChange[i].longitude) {
        detailsFromSearch.latitude = newCoordinates[i].latitude;
        detailsFromSearch.longitude = newCoordinates[i].longitude;
      }
    }
    this.setState({ destinationDetails: detailsFromSearch, destinationDefined: true })
  }

  renderTiles() {
    return tiles.map(tile =>
      <MapTiles key={tile.origin} tile={tile} />
    );
  }

  removeList() {
    this.setState({ searchAlternatives: false })
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;
    const onMap = true;
    const { selected2, selectedColor } = this.state
    const selectedText = options[selected2].component || options[selected2]
    return (
      console.log('runFab', this.state.selected2),
      <Container>
        <TouchableWithoutFeedback onPress={this.removeList.bind(this)}>
          <View style={{ height: 150 }} >
            <NewHeader />
          </View>
        </TouchableWithoutFeedback>
        <Content scrollEnabled={false}>
          <TouchableWithoutFeedback onPress={this.removeList.bind(this)}>
            <View style={{ width, height }}>
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
                showsUserLocation //tilagt currentPosition
                followUserLocation //tillagt currentPosition
              >
                <Markers />
                {this.renderOriginMarker()};
                  {this.renderDestinationMarker()};
                  {this.renderRoute()};
                  {this.renderLongRoute()};
                  {this.renderTiles()};
                  {this.renderRunningRoute()};
                  {this.runningRoute()};
                  {this.runningExitButton()};
                </MapView>
              <FABExample callbackFromParent={this.routeAlternativeCallback} />
              {/* <Fab
                        active={this.state.active}
                        active={false}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: 'red', marginBottom: 200, width: 40, height: 40 }}
                        position="bottomLeft"
                    onPress={() => {
                    }}
                    >
                        <Icon name="close-circle" />
                    </Fab> */}
              <View style={{ position: 'absolute', flexDirection: 'column', width: width }}>
                <View style={{ flex: 1 }} zIndex={3}>
                  <SearchBar callbackFromParent={this.originCallback} booleanFromParent={this.state.searchAlternatives} placeholder={'Från'} />
                </View>
                <View style={{ position: 'absolute', flexDirection: 'column', width: width, flex: 1, marginTop: 35 }}>
                  <SearchBar callbackFromParent={this.destinationCallback} booleanFromParent={this.state.searchAlternatives} placeholder={'Till'} />
                </View>
              </View>
              <ActionSheet
                ref={this.getActionSheetRef}
                title={title}
                message="Här väljer du vilken färg på vägarna som ruttplaneraren ska anpassa sig till. Kan du t.ex. som mest tänka dig röda vägar men inte svarta, välj röd "
                options={options}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={this.handlePress}
              />
            </View>
          </TouchableWithoutFeedback>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  }
});


{/* <LoadingView loading={this.state.loading}> */ }

{/* </LoadingView> */ }



// import Spinner from 'react-native-loading-spinner-overlay';
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

            // spinnerView: {
            //   position: 'absolute',
            //   top: 0,
            //   left: 0,
            //   right: 0,
            //   bottom: 0,
            //   justifyContent: 'center',
            //   alignItems: 'center'
            // },
            // spinnerModal: {
            //   width: 200,
            //   height: 130,
            //   borderRadius: 20,
            //   borderWidth: 2,
            //   backgroundColor: 'white',
            //   justifyContent: 'center',
            //   alignItems: 'center'
            // },
            // spinnerText: {
            //   fontSize: 20,
            //   marginTop: 10,
            //   textShadowColor: 'black',
            //   fontFamily: 'Arial-BoldItalicMT'
            // },
  // activityIndicator: {
  //   flex: 1,
  // }





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
//           strokeColor='#fcff77'
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






