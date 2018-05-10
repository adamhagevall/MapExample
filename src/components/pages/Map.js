

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
import { difficultRoute} from '../NodesDifficult';

import Spinner from 'react-native-loading-spinner-overlay';
var bild = require('../Assets/fadedmap.jpg');


var customToilet = require('../101.jpg');
var customParking = require('../Parking.png');
var customArena = require('../Arena.png');
var customBed = require('../Bed.png');
let { width, height } = Dimensions.get('window');
const tiles = require('../RoadColors');
const mapStyling = require('../mapStyle.json')

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
      routeTile: [],
      originDefined: false,
      destinationDefined: false
    }
  }
  

  renderOriginMarker() {
    if (this.state.originDefined) {
      console.log('hej');
      return (
        <MapView.Marker
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
          style={{ height: 1 }}
          coordinate={this.state.destinationDetails}
          pinColor={'green'}
        />
      );
    }
  }

  renderRoute() {
    if (this.state.originDefined && this.state.destinationDefined) {
      const waypointDetails = this.renderDijkstra(this.state.originDetails, this.state.destinationDetails);
      const customWaypointArray = [];
      for (i = 0; i < waypointDetails.length; i++) {
        customWaypointArray.push(waypointDetails[i].coords)
      }
      console.log("här är waypoints", customWaypointArray)

      this.mapRef.fitToCoordinates(
        coordinates = [this.state.originDetails, this.state.destinationDetails], 
        edgePadding = {top: 40, bottom: 40, left: 40, right: 40 },
        animated = true,

      );
      return (
        <MapViewDirections
          origin={this.state.originDetails}
          destination={this.state.destinationDetails}
          waypoints={customWaypointArray}
          apikey="AIzaSyA9Byks-4BNqpvXaon-vrYpF2uBRn6FSKQ"
          strokeWidth={5}
          strokeColor='yellow'
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
    const arrayToSend = [];
    const Graph = require('node-dijkstra');
    const route = new Graph();

    // route.addNode('A', { B: 1, C: 1 })
    // route.addNode('B', { A: 1, F: 1000 })
    // route.addNode('C', { A: 1, D: 1, F: 1000 })
    // route.addNode('D', { C: 1, E: 1 })
    // route.addNode('E', { D: 1, F: 1 })
    // route.addNode('F', { E: 1, B: 1000, C: 1000 })


    route.addNode("AA", { AB: 1, AF: 1, BA: 1 })
    route.addNode("AB", { AA: 1, AC: 1, BB: 10 })
    route.addNode("AC", { AB: 1, AD: 1, BB: 10 })
    route.addNode("AD", { AC: 1, AE: 1, BE: 1 })
    route.addNode("AE", { AD: 1, AF: 1, AL: 1 })
    route.addNode("AF", { AA: 1, AE: 1, AG: 1 })
    route.addNode("AG", { AF: 1, AH: 10 })
    route.addNode("AH", { AG: 10, AI: 10, AP: 10 })
    route.addNode("AI", { AH: 10, AJ: 1 })
    route.addNode("AJ", { AI: 1, AK: 1, AO: 1 })
    route.addNode("AK", { AJ: 1, AR: 1, AZ: 1 })
    route.addNode("AL", { AE: 1, AM: 1, AS: 1 })
    route.addNode("AM", { AN: 1, AL: 1 })
    route.addNode("AN", { AM: 1, AO: 10, AQ: 1 })
    route.addNode("AO", { AJ: 1, AN: 10, AP: 1, AR: 1 })
    route.addNode("AP", { AH: 10, AO: 1 })
    route.addNode("AQ", { AN: 1, AR: 1, AS: 1 })
    route.addNode("AR", { AK: 1, AO: 1, AQ: 1, AU: 1 })
    route.addNode("AS", { AL: 1, AQ: 1, AT: 1 })
    route.addNode("AT", { AS: 1, AU: 1, BL: 1 })
    route.addNode("AU", { AR: 1, AT: 1, AV: 10 })
    route.addNode("AV", { AU: 10, CB: 1, CE: 1, CD: 100 })
    route.addNode("AW", { AX: 10, CE: 1, CL: 1 })
    route.addNode("AX", { AW: 10, AY: 1 })
    route.addNode("AY", { AX: 1, AZ: 1, CN: 1 })
    route.addNode("AZ", { AK: 1, AY: 1, CO: 1 })
    route.addNode("BA", { AA: 1, BB: 10, BC: 1, DA: 100 })
    route.addNode("BB", { AB: 10, AC: 10, BA: 10 })
    route.addNode("BC", { BA: 1, BD: 10, BN: 10 })
    route.addNode("BD", { BC: 10, BE: 1, BF: 1 })
    route.addNode("BE", { AD: 1, BD: 1, BF: 1 })
    route.addNode("BF", { BD: 1, BE: 1, BG: 1 })
    route.addNode("BG", { BF: 1, BH: 1, BQ: 1 })
    route.addNode("BH", { BG: 1, BI: 1, BM: 100 })
    route.addNode("BI", { BH: 1, BJ: 1, BT: 10 })
    route.addNode("BJ", { BI: 1, BK: 10, BU: 100 })
    route.addNode("BK", { BJ: 10, BL: 10, BM: 1 })
    route.addNode("BL", { BK: 10, BM: 100, BW: 100, BY: 1 })
    route.addNode("BM", { BH: 100, BK: 1, BL: 100 })
    route.addNode("BN", { BC: 10, BO: 1, DA: 10 })
    route.addNode("BO", { BN: 1, BP: 1, DD: 100 })
    route.addNode("BP", { BO: 1, BQ: 1, DH: 100 })
    route.addNode("BQ", { BG: 1, BP: 1, BR: 1 })
    route.addNode("BR", { BQ: 1, BS: 1, DJ: 100 })
    route.addNode("BS", { BR: 1, BT: 100, BU: 1, DK: 100 })
    route.addNode("BT", { BI: 10, BS: 100 })
    route.addNode("BU", { BJ: 100, BS: 1, BV: 1 })
    route.addNode("BV", { BU: 1, BW: 1, DM: 100 })
    route.addNode("BW", { BL: 100, BV: 1, BX: 1, EG: 100 })
    route.addNode("BX", { BW: 1, BY: 1000, BZ: 1, EI: 100 })
    route.addNode("BY", { BL: 1, BX: 1000, CA: 1 })
    route.addNode("BZ", { BX: 1, CA: 100, CC: 1, EM: 100 })
    route.addNode("CA", { BY: 1, BZ: 100, CB: 1 })
    route.addNode("CB", { AV: 1, CA: 1, CC: 100 })
    route.addNode("CC", { BZ: 1, CB: 100, CD: 1, EN: 100 })
    route.addNode("CD", { AV: 100, CC: 1, CF: 1, EW: 100 })
    route.addNode("CE", { AV: 1, AW: 1, CF: 100, CH: 100 })
    route.addNode("CF", { CD: 1, CE: 100, CG: 1, EU: 100 })
    route.addNode("CG", { CF: 1, CH: 100, CI: 1, ET: 100 })
    route.addNode("CH", { CE: 100, CG: 100, CJ: 100 })
    route.addNode("CI", { CG: 1, CJ: 1, ES: 100 })
    route.addNode("CJ", { CH: 100, CI: 1, CK: 1 })
    route.addNode("CK", { CJ: 1, CL: 100, CQ: 100 })
    route.addNode("CL", { AW: 1, CK: 100, CM: 10 })
    route.addNode("CM", { CL: 10, CP: 100 })
    route.addNode("CN", { AY: 1, CP: 1 })
    route.addNode("CO", { AZ: 1, CN: 10 })
    route.addNode("CP", { CM: 100, CN: 1 })
    route.addNode("CQ", { CK: 100, CR: 100, ES: 1 })
    route.addNode("CR", { CQ: 100, CS: 100 })
    route.addNode("CS", { CR: 100, CT: 100, CZ: 10 })
    route.addNode("CT", { CS: 100, CU: 100, CY: 1 })
    route.addNode("CU", { CT: 100, CV: 1, CX: 1, FE: 1 })
    route.addNode("CV", { CU: 1, CW: 1, FC: 1 })
    route.addNode("CW", { CV: 1, CX: 1, EZ: 1 })
    route.addNode("CX", { CU: 1, CW: 1, CY: 1 })
    route.addNode("CY", { CT: 1, CX: 1, CZ: 1 })
    route.addNode("CZ", { CS: 10, CY: 1, FB: 1 })
    route.addNode("DA", { BA: 100, BN: 10, DB: 10 })
    route.addNode("DB", { DA: 10, DC: 10, DE: 1 })
    route.addNode("DC", { DB: 10, GA: 100 })
    route.addNode("DD", { BO: 100, DE: 1, DH: 1 })
    route.addNode("DE", { DB: 1, DD: 1, DF: 10 })
    route.addNode("DF", { DE: 10, DG: 1 })
    route.addNode("DG", { DF: 1, DP: 1 })
    route.addNode("DH", { BP: 100, DD: 1, DI: 1 })
    route.addNode("DI", { DH: 1, DJ: 1, DR: 1 })
    route.addNode("DJ", { BR: 100, DI: 1, DK: 1 })
    route.addNode("DK", { BS: 100, DJ: 1, DL: 1, DS: 1 })
    route.addNode("DL", { DK: 1, DM: 1, DU: 1 })
    route.addNode("DM", { BY: 100, DL: 1, DN: 1 })
    route.addNode("DN", { DM: 1, DO: 1, DV: 1 })
    route.addNode("DO", { DN: 1, EB: 10, EG: 1 })
    route.addNode("DP", { DG: 1, DQ: 1, GB: 10 })
    route.addNode("DQ", { DP: 1, DR: 1, DW: 1 })
    route.addNode("DR", { DI: 1, DQ: 1, DT: 1 })
    route.addNode("DS", { DK: 1, DT: 10 })
    route.addNode("DT", { DR: 1, DS: 10, DU: 1, DX: 1 })
    route.addNode("DU", { DL: 1, DT: 1, DV: 1 })
    route.addNode("DV", { DN: 1, DU: 1, DY: 1 })
    route.addNode("DW", { DQ: 1, DX: 1, GC: 1 })
    route.addNode("DX", { DT: 1, DW: 1, DY: 1, GW: 10 })
    route.addNode("DY", { DV: 1, DX: 1, DZ: 10 })
    route.addNode("DZ", { DY: 10, EA: 10, GW: 1 })
    route.addNode("EA", { DZ: 10, EB: 100, EC: 10 })
    route.addNode("EB", { DO: 10, EA: 100 })
    route.addNode("EC", { EA: 10, ED: 10, GT: 100 })
    route.addNode("ED", { EC: 10, EE: 100, GU: 100 })
    route.addNode("EE", { ED: 100, EF: 100, EJ: 10 })
    route.addNode("EF", { EE: 100, EH: 10 })
    route.addNode("EG", { BW: 100, DO: 1, EH: 1 })
    route.addNode("EH", { EF: 10, EG: 1, EI: 1 })
    route.addNode("EI", { BX: 100, EH: 1, EJ: 100, EK: 1 })
    route.addNode("EJ", { EE: 10, EI: 100, EL: 10 })
    route.addNode("EK", { EI: 1, EL: 100, EM: 1 })
    route.addNode("EL", { EJ: 10, EK: 100, EO: 100, GV: 100 })
    route.addNode("EM", { BZ: 100, EK: 1, EN: 1 })
    route.addNode("EN", { CC: 100, EM: 1, EV: 1 })
    route.addNode("EO", { EL: 100, EP: 1, EV: 10 })
    route.addNode("EP", { EO: 1, EQ: 10 })
    route.addNode("EQ", { EP: 10, ER: 1 })
    route.addNode("ER", { EQ: 1, ES: 1 })
    route.addNode("ES", { CI: 100, CQ: 1, ER: 1, ET: 1 })
    route.addNode("ET", { CG: 100, ES: 1, EU: 1 })
    route.addNode("EU", { CF: 100, ET: 1, EW: 10 })
    route.addNode("EV", { EN: 1, EO: 10, EW: 10 })
    route.addNode("EW", { CD: 100, EU: 10, EV: 10 })
    route.addNode("EX", { EY: 1, FL: 1, FS: 1 })
    route.addNode("EY", { EX: 1, FA: 1, FB: 1 })
    route.addNode("EZ", { CW: 1, FA: 1, FB: 1 })
    route.addNode("FA", { EY: 1, EZ: 1, FG: 1 })
    route.addNode("FB", { CZ: 1, EY: 1, EZ: 1 })
    route.addNode("FC", { CV: 1, FD: 1, FF: 1 })
    route.addNode("FD", { FC: 1, FE: 1 })
    route.addNode("FE", { CU: 1, FD: 1 })
    route.addNode("FF", { FC: 1, FG: 1, FI: 1 })
    route.addNode("FG", { FA: 1, FF: 1, FH: 10, FL: 1 })
    route.addNode("FH", { FG: 10, FI: 10, FK: 1 })
    route.addNode("FI", { FF: 1, FH: 10, FJ: 1 })
    route.addNode("FJ", { FI: 1, FK: 10, FM: 1 })
    route.addNode("FK", { FH: 1, FJ: 10, FL: 1 })
    route.addNode("FL", { EX: 1, FG: 1, FK: 1, FR: 1 })
    route.addNode("FM", { FJ: 1, FN: 10, FP: 1 })
    route.addNode("FN", { FM: 10, FO: 1 })
    route.addNode("FO", { FN: 1, FP: 1, FQ: 10, FV: 1, FY: 1 })
    route.addNode("FP", { FM: 1, FO: 1, GR: 1 })
    route.addNode("FQ", { FO: 10, FR: 1, FU: 1 })
    route.addNode("FR", { FL: 1, FQ: 1, FS: 10 })
    route.addNode("FS", { EX: 1, FR: 10, FT: 1 })
    route.addNode("FT", { FS: 1, FU: 100, GV: 100 })
    route.addNode("FU", { FQ: 1, FT: 100, FW: 10 })
    route.addNode("FV", { FO: 1, FW: 100 })
    route.addNode("FW", { FU: 10, FV: 100, FX: 10, GV: 100 })
    route.addNode("FX", { FW: 10, FY: 10, GS: 1 })
    route.addNode("FY", { FO: 1, FX: 10, FZ: 1 })
    route.addNode("FZ", { FY: 1, GO: 1, GQ: 10 })
    route.addNode("GA", { DC: 100, GB: 1 })
    route.addNode("GB", { DP: 10, GC: 1 })
    route.addNode("GC", { DW: 1, GB: 1, GD: 10 })
    route.addNode("GD", { GC: 10, GE: 1000, GW: 1 })
    route.addNode("GE", { GD: 1000, GF: 1 })
    route.addNode("GF", { GE: 1, GH: 100, GG: 1 })
    route.addNode("GG", { GF: 1, GI: 10, GJ: 1 })
    route.addNode("GH", { GF: 100, GI: 1, GW: 100 })
    route.addNode("GI", { GG: 10, GH: 1, GK: 1 })
    route.addNode("GJ", { GG: 1, GK: 1, GL: 1 })
    route.addNode("GK", { GI: 1, GJ: 1, GL: 1, GM: 1 })
    route.addNode("GL", { GJ: 1, GK: 1, GP: 1 })
    route.addNode("GM", { GK: 1, GN: 10 })
    route.addNode("GN", { GM: 10, GO: 10, GS: 100 })
    route.addNode("GO", { FZ: 1, GN: 10, GP: 10 })
    route.addNode("GP", { GL: 1, GO: 10, GQ: 1 })
    route.addNode("GQ", { FZ: 10, GP: 1, GR: 1 })
    route.addNode("GR", { FP: 1, GQ: 1 })
    route.addNode("GS", { FX: 1, GN: 100, GT: 100 })
    route.addNode("GT", { EC: 100, GS: 100, GU: 100 })
    route.addNode("GU", { ED: 100, GT: 100, GV: 100 })
    route.addNode("GV", { EL: 100, FT: 100, FW: 100, GU: 100 })
    route.addNode("GW", { DX: 10, DZ: 1, GD: 1, GH: 10000 })

    const routeArray = route.path(originNode, destinationNode, {trim: true } );
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

  originCallback = (detailsFromSearch) => {
    this.setState({ originDetails: detailsFromSearch, originDefined: true })
    console.log('originDetails: ', this.state.originDetails);
  };

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
          <View style={{height: 150}}>
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
              ref = {(ref) => {this.mapRef =ref}}
              provider={PROVIDER_GOOGLE}
              style={styles.container}
              customMapStyle={mapStyling}
              initialRegion={{
                latitude: 57.638945, 
                longitude: 18.292500,
                latitudeDelta: 0.002,
                longitudeDelta: 0.015
              }}
            >
              <MapView.Marker
                style={{ height: 1}}
                coordinate={{ longitude: 18.292853, latitude: 57.641380 }}
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
              {this.renderRoute()};
              {this.renderTiles()};
            </MapView>
            <FABExample />
            <View style={{ position: 'absolute', flexDirection: 'column', width: width }}>
         
         <View style={{ flex: 1}}>
         <SearchBar callbackFromParent={this.destinationCallback} placeholder={'Till'} />
         </View>
         <View style={{ position: 'absolute', flexDirection: 'column', width: width, flex: 1, marginTop: 35}}>
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





